# Homework #8: End to End System Design for Streaming : IoT System


**End to End System Design for Streaming - IoT Temperature Data Processing**: Please provide an end to end system design for a IoT Weather Data Processing Service. It takes readings from a large number of temperature sensors sprinkled throughout a large geographic area. Output is a view like the [_weather.com"_ map](https://weather.com/weather/radar/interactive/l/e5df6df1b95181d6ea367f0efdfb0c5deb7119883497c8dde394caa80321b71a) of the geographic area and the ability to pull up maximum and minimum temperatures over a period of time.

Please call out the functional and non-functional requirements, Data model, storage, type of storage, APIs and key issues in the design. Please provide a picture of how the different components/services of the design will be laid out and how they will communicate. 

Ensure that this design document is no more than 4 pages long.

 

**Requirements Functional**
 

~ Capture Sensor Data (100B)

    ~ Sensor Id

    ~ Temp Reading

    ~ Time Stamp

    ~ Lat./Long. <Optional>

~ Sensor Data Refresh every 10s

~ Convert each reading to a pixel. Compile bitmap

~ Able to pull up max./min. over a certain duration

 

**Requirements Non-Functional**

~ Scale

    ~ 5M+ Sensors (In an area of 500 x 500 miles = 20 sensors by square mile)

    ~ Each Sensor Generating Reading every 10s

    ~ UI (4k UHD)

~ Availability

   ~ Bitmap/Max-Min Service = Highly Available = 99.999 available

   ~ Need to show last reading (for 1 day)

~ Performance

    ~ Bitmap UI should pull up in < 2s

    ~ Max - Min service should respond in < 2s
    