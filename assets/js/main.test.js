import {convertVND, convertToNumber} from './tool.js';
const expect=chai.expect

describe('function convertVND()', function() {
    it('should equal 300.000.000đ if 300000000', function(){
        const result = convertVND(300000000)
        expect(result).to.equal('300.000.000đ');
    })
    it('should equal 300.000đ if 300000', function(){
        const result = convertVND(300000)
        expect(result).to.equal('300.000đ');
    })

    it('should equal 0đ if 0', function(){
        const result = convertVND(0)
        expect(result).to.equal('0đ');
    })
})

describe('function convertToNumber()', function() {
    it('should equal 300000000 if 300.000.000đ', function(){
        const result = convertToNumber('300.000.000đ')
        expect(result).to.equal(300000000);
    })

    it('should equal 300000 if 300.000đ', function(){
        const result = convertToNumber('300.000đ')
        expect(result).to.equal(300000);
    })

    it('should equal 0 if 0đ', function(){
        const result = convertToNumber('0đ')
        expect(result).to.equal(0);
    })
})