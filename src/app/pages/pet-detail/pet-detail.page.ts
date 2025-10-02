import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService, Pet } from '../../services/pet';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.page.html',
  styleUrls: ['./pet-detail.page.scss'],
  standalone: false,
})
export class PetDetailPage implements OnInit {
  pet: Pet = {
    nome: '',
    especie: '',
    raca: '',
    idade: 0,
    observacoes: '',
  };
  
  id: string | null = null;
  isNew = true;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isNew = false;
      this.load();
    }
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Carregando pet...'
    });
    await loading.present();

    this.petService.getPet(this.id!).subscribe(res => {
      loading.dismiss();
      if (res) {
        this.pet = res;
      } else {
        this.showToast('Pet não encontrado!', 'danger');
        this.router.navigateByUrl('/home');
      }
    }, err => {
      loading.dismiss();
      this.showToast('Erro ao carregar pet.', 'danger');
      this.router.navigateByUrl('/home');
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Salvando pet...'
    });
    await loading.present();

    if (this.isNew) {
      this.petService.addPet(this.pet).then(() => {
        loading.dismiss();
        this.showToast('Pet adicionado com sucesso!', 'success');
        this.router.navigateByUrl('/home');
      }, err => {
        loading.dismiss();
        this.showToast('Erro ao adicionar pet.', 'danger');
      });
    } else {
      this.petService.updatePet(this.pet).then(() => {
        loading.dismiss();
        this.showToast('Pet atualizado com sucesso!', 'success');
        this.router.navigateByUrl('/home');
      }, err => {
        loading.dismiss();
        this.showToast('Erro ao atualizar pet.', 'danger');
      });
    }
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}