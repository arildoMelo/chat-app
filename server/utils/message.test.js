const expect = require('expect');
var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'test';
        var text = 'testing message';
        var res = generateMessage(from, text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'test';
        var lat = '1';
        var long = '2';
        var res = generateLocationMessage(from, lat, long);
        expect(res.from).toBe(from);
        expect(res.url).toBe('https://www.google.com/maps?q=' + lat + ',' +long);
        expect(typeof res.createAt).toBe('number');
    });
});