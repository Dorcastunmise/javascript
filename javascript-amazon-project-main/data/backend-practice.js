//XMLHttpRequest(): creates a new HTTP message(i.e request) to send to the backend
/*
  Content types of HTTP response:
  application/json
  text/plain
  image/jpeg
*/
const msg_req = new XMLHttpRequest(); 

msg_req.addEventListener('load', () => {
  const data = msg_req.response;
  //console.log(JSON.parse(data));
  console.log(data);
});
msg_req.open('GET', 'https://supersimplebackend.dev/images/apple.jpg'); //open(request type, url) url: protocol//domain name/path
msg_req.send();