export default function () {
  // mock window for `paypal-checkout`
  Object.defineProperty(window.location, 'host', {
    writeable: true,
    value: 'localhost',
  });
}
