import additionalProps from '@/util/additionalProps';

describe('additionalProps.js', () => {
  it('exports two functions', () => {
    expect(additionalProps).toEqual(expect.objectContaining({
      vmProps: expect.any(Function),
      getTypedProps: expect.any(Function),
    }));
  });

  it('has the button props', () => {
    const props = additionalProps.vmProps();

    expect(props).toEqual(expect.objectContaining({
      buttonStyle: expect.any(Object),
      braintree: expect.any(Object),
      locale: expect.any(Object),
    }));

    expect(props).toEqual(expect.objectContaining({
      buttonStyle: {
        type: Object,
        required: false,
      },
    }));

    expect(props).toEqual(expect.objectContaining({
      braintree: {
        type: Object,
        required: false,
      },
    }));

    expect(props).toEqual(expect.objectContaining({
      locale: {
        type: String,
        required: false,
      },
    }));
  });

  it('has the payment(s) props', () => {
    const props = additionalProps.vmProps();

    expect(props).toEqual(expect.objectContaining({
      experience: expect.any(Object),
    }));

    expect(props).toEqual(expect.objectContaining({
      experience: {
        type: Object,
        required: false,
      },
    }));
  });

  it('has the transaction props', () => {
    const props = additionalProps.vmProps();

    expect(props).toEqual(expect.objectContaining({
      invoiceNumber: expect.any(Object),
      notifyUrl: expect.any(Object),
      items: expect.any(Object),
    }));

    expect(props).toEqual(expect.objectContaining({
      invoiceNumber: {
        type: String,
        required: false,
      },
    }));

    expect(props).toEqual(expect.objectContaining({
      notifyUrl: {
        type: String,
        required: false,
        validator: expect.any(Function),
      },
    }));

    expect(props).toEqual(expect.objectContaining({
      items: {
        type: Array,
        required: false,
      },
    }));
  });
});
