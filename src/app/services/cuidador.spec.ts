import { TestBed } from '@angular/core/testing';

import { Cuidador } from './cuidador';

describe('Cuidador', () => {
  let service: Cuidador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cuidador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
