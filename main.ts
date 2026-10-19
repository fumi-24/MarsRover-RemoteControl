function doSomething (テキスト: string) {
    tekisuto = parseFloat(テキスト.charAt(2))
    if (テキスト.includes("a")) {
        if (tekisuto == A) {
            radio.sendString(テキスト)
            A = tekisuto
        }
    } else if (テキスト.includes("b")) {
        if (tekisuto == B) {
            radio.sendString(テキスト)
            B = tekisuto
        }
    }
}
let kouu = 0
let zenn = 0
let tekisuto = 0
let A = 0
let B = 0
B = 0
A = 0
radio.setGroup(185)
radio.setTransmitPower(7)
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        zenn = 0
        led.plot(0, 1)
        if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            kouu = 1
            led.plot(0, 2)
            radio.sendString("kouu")
        } else {
            kouu = 0
            doSomething("a2")
        }
    } else if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        kouu = 0
        led.plot(0, 0)
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            zenn = 1
            led.plot(0, 3)
            radio.sendString("zenn")
        } else {
            doSomething("a1")
            zenn = 0
        }
    } else {
        if (zenn == 1) {
            radio.sendString("zstop")
        }
        if (kouu == 1) {
            radio.sendString("kstop")
        }
        doSomething("a0")
        kouu = 0
        zenn = 0
    }
    if (zenn == 0 && kouu == 0) {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            led.plot(0, 3)
            doSomething("b1")
        } else if (pins.digitalReadPin(DigitalPin.P0) == 0) {
            led.plot(0, 2)
            doSomething("b2")
        } else {
            doSomething("b0")
        }
    }
})
