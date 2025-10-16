import { Component } from '@angular/core';
import { PetService, Pet } from '../services/pet';
import { CuidadorService, Cuidador } from '../services/cuidador';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  pets: Pet[] = [];
  cuidadores: Cuidador[] = [];
  segmentoSelecionado: string = 'pets';

  constructor(
    private petService: PetService,
    private cuidadorService: CuidadorService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadPets();
    this.loadCuidadores();
  }

  segmentChanged(event: any) {
    this.segmentoSelecionado = event.detail.value;
  }

  loadPets() {
    this.petService.getPets().subscribe(res => {
      this.pets = res;
    });
  }

  loadCuidadores() {
    this.cuidadorService.getCuidadores().subscribe(res => {
      this.cuidadores = res;
    });
  }

  addPet() {
    this.router.navigateByUrl('/pet-detail');
  }

  editPet(pet: Pet) {
    this.router.navigateByUrl(`/pet-detail/${pet.id}`);
  }

  addCuidador() {
    this.router.navigateByUrl('/cuidador-detail');
  }

  editCuidador(cuidador: Cuidador) {
    this.router.navigateByUrl(`/cuidador-detail/${cuidador.id}`);
  }

  async deletePet(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este pet?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.petService.deletePet(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteCuidador(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este cuidador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.cuidadorService.deleteCuidador(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
