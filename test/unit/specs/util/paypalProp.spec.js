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
      injection: 'someExperience',
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
      type: Object,
      required: false,
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

    const diff = paypal.getChange(o);

    expect(diff).toEqual({
      name: 'somePaypal',
      value: { text: 'paypal is so cool' },
    });
  });
});
