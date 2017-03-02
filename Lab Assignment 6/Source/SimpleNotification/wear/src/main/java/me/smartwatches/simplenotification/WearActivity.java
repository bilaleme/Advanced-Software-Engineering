package me.smartwatches.simplenotification;

import android.app.Activity;
import android.os.Bundle;
import android.support.wearable.view.WatchViewStub;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.w3c.dom.Text;

public class WearActivity extends Activity {

    private TextView mTextView;

    private int millisecond;
    private int seconds;
    private int minutes;
    private long start;
    private boolean trigger = false;
    Thread watchThread;
    TextView tv;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_wear);
        final WatchViewStub stub = (WatchViewStub) findViewById(R.id.watch_view_stub);
        stub.setOnLayoutInflatedListener(new WatchViewStub.OnLayoutInflatedListener() {
            @Override
            public void onLayoutInflated(WatchViewStub stub) {
                tv = (TextView) stub.findViewById(R.id.textView);
                tv.setText("00:00:00");

                millisecond = 0;
                seconds = 0;
                minutes = 0;


                Button start = (Button) stub.findViewById(R.id.button3);
                Button stop = (Button) stub.findViewById(R.id.button4);
                Button clear = (Button) stub.findViewById(R.id.button2);

                watchThread = new Thread(new Runnable() {
                    @Override
                    public void run() {
                        while(true){
                            try{
                                if(getTrigger()) {

                                    millisecond = (millisecond + 1);
                                    if (millisecond == 10) {
                                        seconds++;
                                        millisecond = 0;
                                    }

                                    if (seconds == 60) {
                                        minutes++;
                                        seconds = 0;
                                    }

                                    setTimeText(((minutes < 10) ? "0" + String.valueOf(minutes) : String.valueOf(minutes)) + ":" + ((seconds < 10) ? "0" + String.valueOf(seconds) : String.valueOf(seconds)) + ":" + ((millisecond < 10) ? "0" + String.valueOf(millisecond) : String.valueOf(millisecond)));


                                    Log.d("Tag", "Bilal");
                                    Thread.sleep(100);
                                }
                            } catch (Exception ex){
                                ex.printStackTrace();
                            }
                        }
                    }
                });

                watchThread.start();
                start.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        trigger = true;
                    }
                });

                stop.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        trigger = false;
                    }
                });

                clear.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        trigger = false;
                        millisecond = 0;
                        seconds = 0;
                        minutes = 0;
                        tv.setText("00:00:00");
                    }
                });

            }
        });

    }

    public void setTimeText(final String text){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                tv.setText(text);
            }
        });
    }

    public boolean getTrigger(){
        return trigger;
    }


}
