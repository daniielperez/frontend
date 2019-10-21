import { ModulesModule } from './modules.module';

describe('ModuleModule', () => {
  let empresaModule: ModulesModule;

  beforeEach(() => {
    empresaModule = new ModulesModule();
  });

  it('should create an instance', () => {
    expect(empresaModule).toBeTruthy();
  });
});
