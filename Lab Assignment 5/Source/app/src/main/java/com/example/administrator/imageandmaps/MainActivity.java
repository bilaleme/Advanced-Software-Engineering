package com.example.administrator.imageandmaps;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.List;

import static com.example.administrator.imageandmaps.R.id.button2;

public class MainActivity extends AppCompatActivity {

    LocationManager manager;
    LocationListener listener;
    public static Location userLocation;
    public static Uri ImageUri;
    public Geocoder geocoder;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setTitle("Sign Up");

        Button btn2 = (Button)findViewById(R.id.button4);
        btn2.setEnabled(false);

        bindFunctions();

    }

    private void openGPS(){
        manager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        int permissioncheck = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION);

        if(permissioncheck == PackageManager.PERMISSION_GRANTED){
            manager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, listener);
        } else {
            System.out.print("Permission Denied");
        }
    }

    private void bindFunctions(){

        Button btn = (Button)findViewById(R.id.button2);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadImage(v);
            }
        });

        Button btn1 = (Button)findViewById(R.id.button5);
        btn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openGPS();
            }
        });

        Button btn2 = (Button)findViewById(R.id.button4);
        btn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                runMapIntent();
            }
        });


        listener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                Log.d("D",location.getLatitude() + " " + location.getLongitude());
                userLocation = location;

                geocoder = new Geocoder(getBaseContext());
                StringBuilder userAddress = new StringBuilder();

                try {
                    List<Address> addresses = geocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
                    Thread.sleep(100);
                    Address address = addresses.get(0);
                    userAddress = new StringBuilder();
                    for (int i = 0; i < address.getMaxAddressLineIndex(); i++) {
                        userAddress.append(address.getAddressLine(i)).append("\t");
                    }
                    userAddress.append(address.getCountryName()).append("\t");

                } catch (Exception ex) {
                    ex.printStackTrace();
                    System.out.println("Not Found");
                }

                TextView tv = (TextView) findViewById(R.id.textView5);
                tv.setText(userAddress);
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
        };
    }

    private void loadImage(View view){
        Intent openImage = new Intent(Intent.ACTION_PICK,MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(openImage,1);
        Log.d("d","Image Loaded");
    }

    private void runMapIntent(){
        Intent mapsIntent = new Intent(MainActivity.this,Maps_Activity.class);
        startActivity(mapsIntent);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == 1){
            Uri selectedImage = data.getData();
            ImageView view = (ImageView) findViewById(R.id.imageView4);
            view.setImageURI(selectedImage);
            ImageUri = selectedImage;
            Button btn2 = (Button)findViewById(R.id.button4);
            btn2.setEnabled(true);
        }
    }
}
