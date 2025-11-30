# NFC Reader Debugging Guide

## Changes Made

### 1. Enhanced NFCReaderButton.jsx

- Added extensive console logging to track every step of the connection process
- Improved error handling with specific error types (InvalidStateError, NotFoundError)
- Added setTimeout for input focus to ensure DOM is ready
- Better cleanup and error reporting for the readable stream

### 2. Fixed UserFormPopup.jsx

- Added `userIdInputRef` using React.useRef
- Passed `inputRef={userIdInputRef}` to NFCReaderButton
- Added `ref={userIdInputRef}` to the user_id input field

### 3. BookFormPopup.jsx

- Already had proper inputRef setup (isbnInputRef)

## How to Debug NFC Connection Issues

### Step 1: Open Browser Console

1. Press F12 to open Developer Tools
2. Go to the Console tab
3. Keep it open while testing

### Step 2: Test Connection

When you click "Connect to NFC Reader", you should see these console logs in order:

```
Requesting serial port...
Port selected: [SerialPort object]
Opening port with baudRate 9600...
Port opened successfully!
Connection state set to true
Focusing input field...
Setting up text decoder...
Reader ready, waiting for data...
```

### Step 3: Scan NFC Tag

When you scan an NFC tag, you should see:

```
Raw data received: [your data]
Complete NFC Tag ID: [your tag ID]
Data sent to callback
```

## Common Issues and Solutions

### Issue 1: "Sometimes it says connected and sometimes not"

**Possible causes:**

- Port is already open from previous connection
- Arduino is not ready when you try to connect
- USB cable or connection issue

**Solutions:**

1. Always disconnect before trying to reconnect
2. Unplug and replug the Arduino USB cable
3. Close and reopen the browser
4. Check console for "InvalidStateError" - this means port is already open

### Issue 2: "Doesn't go automatically to the ID input"

**Fixed by:**

- Added `setTimeout` with 100ms delay before focusing
- This ensures the DOM is fully ready

**Check console for:**

- "Focusing input field..." - means it tried to focus
- "Input ref is not available" - means the ref wasn't passed correctly

### Issue 3: "Web doesn't read the NFC tag"

**Debugging steps:**

1. Check if you see "Raw data received:" in console
   - If YES: Data is coming from Arduino
   - If NO: Arduino is not sending data

2. Check your Arduino code:
   - Make sure it sends data with `Serial.println(tagID)`
   - Baud rate must be 9600
   - Data should end with newline character (\n)

3. Check the data format:
   - The code splits on '\n' (newline)
   - Make sure Arduino sends complete lines

### Issue 4: Connection drops unexpectedly

**Check console for:**

- "Port disconnected" - physical disconnection
- "Read loop error:" - error in data reading
- "Readable stream closed with error:" - stream error

## Arduino Code Requirements

Your Arduino should send data like this:

```cpp
void loop() {
  if (nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength)) {
    String tagID = "";
    for (uint8_t i = 0; i < uidLength; i++) {
      tagID += String(uid[i], HEX);
    }
    Serial.println(tagID);  // MUST use println (with newline)
    delay(1000);
  }
}

void setup() {
  Serial.begin(9600);  // MUST match baudRate in web code
}
```

## Testing Checklist

- [ ] Browser supports Web Serial API (Chrome/Edge)
- [ ] Arduino is properly connected via USB
- [ ] Arduino code uses Serial.begin(9600)
- [ ] Arduino code uses Serial.println() not Serial.print()
- [ ] Console shows all connection logs
- [ ] Console shows "Raw data received" when scanning
- [ ] Input field gets focused after connection
- [ ] Data appears in the input field

## Next Steps if Still Not Working

1. **Test Arduino separately:**
   - Open Arduino IDE Serial Monitor
   - Set baud rate to 9600
   - Scan an NFC tag
   - Verify you see the tag ID

2. **Test with simple data:**
   - Modify Arduino to send "TEST" every second
   - See if web app receives it

3. **Check browser permissions:**
   - Go to browser settings
   - Check if serial port access is allowed
   - Try in incognito mode

4. **Share console logs:**
   - Copy all console output
   - Share for further debugging
