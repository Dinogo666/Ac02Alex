import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuidadorService, Cuidador } from '../../services/cuidador';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cuidador-detail',
  templateUrl: './cuidador-detail.page.html',
  styleUrls: ['./cuidador-detail.page.scss'],
  standalone: false,
})
export class CuidadorDetailPage implements OnInit {
  cuidador: Cuidador = {
    nome: '',
    telefone: '',
    experiencia: 0,
    especialidades: '',
  };
  
  id: string | null = null;
  isNew = true;

  constructor(
    private route: ActivatedRoute,
    private cuidadorService: CuidadorService,
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
      message: 'Carregando cuidador...'
    });
    await loading.present();

    this.cuidadorService.getCuidador(this.id!).subscribe(res => {
      loading.dismiss();
      if (res) {
        this.cuidador = res;
      } else {
        this.showToast('Cuidador não encontrado!', 'danger');
        this.router.navigateByUrl('/home');
      }
    }, err => {
      loading.dismiss();
      this.showToast('Erro ao carregar cuidador.', 'danger');
      this.router.navigateByUrl('/home');
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Salvando cuidador...'
    });
    await loading.present();

    if (this.isNew) {
      this.cuidadorService.addCuidador(this.cuidador).then(() => {
        loading.dismiss();
        this.showToast('Cuidador adicionado com sucesso!', 'success');
        this.router.navigateByUrl('/home');
      }, err => {
        loading.dismiss();
        this.showToast('Erro ao adicionar cuidador.', 'danger');
      });
    } else {
      this.cuidadorService.updateCuidador(this.cuidador).then(() => {
        loading.dismiss();
        this.showToast('Cuidador atualizado com sucesso!', 'success');
        this.router.navigateByUrl('/home');
      }, err => {
        loading.dismiss();
        this.showToast('Erro ao atualizar cuidador.', 'danger');
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