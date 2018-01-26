import defaultProps from '@/util/defaultProps';

describe('defaultProps.js', () => {
  it('has the required props', () => {
    const props = defaultProps();

    expect(props).toEqual(expect.objectContaining({
      amount: expect.any(Object),
      currency: expect.any(Object),
    }));

    expect(props.amount).toEqual({
      type: String,
      required: true,
    });

    expect(props.currency).toEqual({
      type: String,
      required: true,
      default: 'USD',
    });
  });

  it('has the optional props', () => {
    const props = defaultProps();

    expect(props).toEqual(expect.objectContaining({
      id: expect.any(Object),
      invoiceNumber: expect.any(Object),
    }));

    expect(props.id).toEqual({
      type: String,
      required: false,
      default: expect.any(String),
    });

    expect(props.invoiceNumber).toEqual({
      type: String,
      required: false,
    });
  });

  it('has the specific props', () => {
    const props = defaultProps();

    expect(props).toEqual(expect.objectContaining({
      client: expect.any(Object),
      commit: expect.any(Object),
      dev: expect.any(Object),
      items: expect.any(Object),
      buttonStyle: expect.any(Object),
    }));

    expect(props.client).toEqual({
      type: Object,
      required: true,
    });

    expect(props.commit).toEqual({
      type: Boolean,
      required: false,
      default: true,
    });

    expect(props.dev).toEqual({
      type: Boolean,
      required: false,
    });

    expect(props.items).toEqual({
      type: Array,
      required: false,
    });

    expect(props.buttonStyle).toEqual({
      type: Object,
      required: false,
    });
  });
});
