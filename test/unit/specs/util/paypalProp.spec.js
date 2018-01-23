import PayPalProp from '@/util/paypalProp';

describe('paypalProp.js', () => {
  it('construct with options object', () => {
    const paypal = new PayPalProp({
      name: 'some-name',
      paypalName: 'somePaypal',
      injectionType: 'someExperience',
    });

    expect(paypal).toEqual(expect.objectContaining({
      name: 'some-name',
      propName: 'somePaypal',
      injectionType: 'someExperience',
    }));
  });

  it('getVmProp()', () => {
    const paypal = new PayPalProp({
      name: 'some-name',
      paypalName: 'somePaypal',
      injectionType: 'someExperience',
    });

    const prop = paypal.getVmProp();

    expect(prop).toEqual({
      'some-name': {
        type: Object,
        required: false,
      },
    });
  });

  it('change()', () => {
    const paypal = new PayPalProp({
      name: 'some-name',
      paypalName: 'somePaypal',
      injectionType: 'someExperience',
    });

    const o = {
      'some-name': { text: 'paypal is so cool' },
    };

    const p = {};

    paypal.change(o, p);

    expect(p).toEqual({
      somePayPal: { text: 'paypal is so cool' },
    });
  });
});
