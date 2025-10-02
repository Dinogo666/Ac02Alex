import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    doc,
    collectionData,
    docData,
    addDoc,
    updateDoc,
    deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Cuidador {
    id?: string;
    nome: string;
    telefone: string;
    experiencia: number;
    especialidades: string;
}

@Injectable({
    providedIn: 'root'
})
export class CuidadorService {
    constructor(private firestore: Firestore){}

    getCuidadores(): Observable<Cuidador[]>{
        const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
        return collectionData(cuidadoresCollectionRef, { idField: 'id' }) as Observable<Cuidador[]>;
    }

    getCuidador(id: string): Observable<Cuidador | undefined> {
        const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
        return docData(cuidadorDocRef, { idField: 'id' }) as Observable<Cuidador | undefined>;
    }

    addCuidador(cuidador: Cuidador) {
        const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
        return addDoc(cuidadoresCollectionRef, cuidador);
    }

    updateCuidador(cuidador: Cuidador) {
        const cuidadorDocRef = doc(this.firestore, `cuidadores/${cuidador.id}`);
        return updateDoc(cuidadorDocRef, { 
            nome: cuidador.nome, 
            telefone: cuidador.telefone, 
            experiencia: cuidador.experiencia, 
            especialidades: cuidador.especialidades 
        });
    }

    deleteCuidador(id: string) {
        const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
        return deleteDoc(cuidadorDocRef);
    }
}