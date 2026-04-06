import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, 
  IonCard, IonCardContent, IonInput, IonSelect, IonSelectOption 
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-record-modal',
  templateUrl: './add-record-modal.component.html',
  styleUrls: ['./add-record-modal.component.scss'],
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, 
    IonCard, IonCardContent, IonInput, IonSelect, IonSelectOption
  ],
})
export class AddRecordModalComponent implements OnInit {
  @Input() recordToEdit: any; // Propriety to receive the record for editing

  carModel: string = '';
  liters: number | null = null;
  km: number | null = null;
  value: number | null = null;
  date: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.recordToEdit) {
      // Pre-fill fields if editing
      this.carModel = this.recordToEdit.carModel;
      this.liters = this.recordToEdit.liters;
      this.km = this.recordToEdit.km;
      this.value = this.recordToEdit.value;
      this.date = this.recordToEdit.date;
    } else {
      // Default to today's date for new records
      this.date = new Date().toISOString().split('T')[0];
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (!this.carModel || !this.liters || !this.km || !this.value || !this.date) {
      // Basic validation (can be replaced with a toast)
      return;
    }
    const record = {
      carModel: this.carModel,
      liters: this.liters,
      km: this.km,
      value: this.value,
      date: this.date // Use the bound date
    };
    return this.modalCtrl.dismiss(record, 'confirm');
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }
}

