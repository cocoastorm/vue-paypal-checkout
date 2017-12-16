import PropHook from "@/util/propHook";

describe('PropHook Class', () => {
  it('initializes PropHook object with properties', () => {
    const hook = new PropHook('name', 'paypalName', 'button');
    expect(hook.name).toEqual('name');
    expect(hook.paypalName).toEqual('paypalName');
    expect(hook.injectType).toEqual('button');
  });

  it('PropHook with mutateProp param gets called', () => {
    const vm = { name: 'bob' };
    const obj = {};

    const mutateProp = jest.fn(() => (vm.name));
    const hook = new PropHook('name', 'paypalName', 'button', mutateProp);

    hook.inject(vm, obj);

    expect(mutateProp).toHaveBeenCalledWith('bob');
    expect(obj.paypalName).toEqual('bob');
  });
});
