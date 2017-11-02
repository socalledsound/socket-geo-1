var expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');



describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});


describe('generateLocationMessage',()=> {
  it('should generate correct location object', ()=> {
    var from = 'me';
    var latitude = 15;
    var longitude = 100;
    var url = 'https://www.google.com/maps?q=15,100';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, url});
    )
  })
})
