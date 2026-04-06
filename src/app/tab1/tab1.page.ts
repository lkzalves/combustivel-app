import { Component } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonNote, IonItemSliding, IonItemOptions, IonItemOption, IonItemDivider, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { AddRecordModalComponent } from '../add-record-modal/add-record-modal.component';
import { addIcons } from 'ionicons';
import { add, carSportOutline, waterOutline, speedometerOutline, cashOutline, trash, create, trendingUpOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    DatePipe, DecimalPipe, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonNote,
    IonItemSliding, IonItemOptions, IonItemOption, IonItemDivider,
    IonGrid, IonRow, IonCol
  ],
})
export class Tab1Page {
  records: any[] = [];

  constructor(private modalCtrl: ModalController) {
    addIcons({ add, carSportOutline, waterOutline, speedometerOutline, cashOutline, trash, create, trendingUpOutline });
  }

  // Getter to group and sort records by month/year
  get groupedRecords() {
    const groups: { monthYear: string, items: any[] }[] = [];
    
    // Sort records by date descending (timeline)
    const sorted = [...this.records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    sorted.forEach((record) => {
      // Create a date object (using noon to avoid timezone issues)
      const date = new Date(record.date + 'T12:00:00');
      // Format as Month Year in Portuguese (e.g., "Abril 2026")
      const monthYear = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      
      // Capitalize first letter
      const capitalized = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
      
      let group = groups.find(g => g.monthYear === capitalized);
      if (!group) {
        group = { monthYear: capitalized, items: [] };
        groups.push(group);
      }
      group.items.push(record);
    });
    
    return groups;
  }

  async openAddRecordModal(recordToEdit?: any) {
    const modal = await this.modalCtrl.create({
      component: AddRecordModalComponent,
      componentProps: {
        recordToEdit: recordToEdit
      }
    });
    await modal.present();
    
    const { data, role } = await modal.onWillDismiss();
    
    if (role === 'confirm' && data) {
      if (recordToEdit) {
        // Update existing record by finding its index in the original array
        const index = this.records.indexOf(recordToEdit);
        if (index > -1) {
          this.records[index] = data;
        }
      } else {
        // Add new record
        this.records.push(data);
      }
    }
  }

  deleteRecord(record: any, slidingItem: IonItemSliding) {
    const index = this.records.indexOf(record);
    if (index > -1) {
      this.records.splice(index, 1);
    }
    slidingItem.close();
  }
}
