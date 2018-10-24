import defaultProps from '@/util/defaultProps';

describe('defaultProps.js', () => {
  test('has the required props', () => {
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

  test('has the optional props', () => {
    const props = defaultProps();

    expect(props).toEqual(expect.objectContaining({
      id: expect.any(Object),
      invoiceNumber: expect.any(Object),
    }));

    expect(props.id).toEqual({
      type: String,
      required: false,
    });

    expect(props.invoiceNumber).toEqual({
      type: String,
      required: false,
    });
  });

  test('has the specific props', () => {
    const props = defaultProps();

    expect(props).toEqual(expect.objectContaining({
      client: expect.any(Object),
      commit: expect.any(Object),
      env: expect.any(Object),
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

    expect(props.env).toEqual({
      type: String,
      required: false,
      default: 'production',
    });
  });
});
