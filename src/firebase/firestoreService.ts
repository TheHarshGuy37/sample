import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { BudgetItem, CeremonialEvent, RoyalGuest } from '../types';

export interface WeddingSettingsData {
  activeMuhuratDate: string;
  brideName?: string;
  groomName?: string;
  venueName?: string;
  totalBudget?: number;
  updatedAt?: string;
}

// 1. Wedding Settings
export async function getWeddingSettings(userId: string): Promise<WeddingSettingsData | null> {
  const path = `users/${userId}/settings/wedding`;
  try {
    const docRef = doc(db, path);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as WeddingSettingsData;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

export async function saveWeddingSettings(userId: string, data: WeddingSettingsData): Promise<void> {
  const path = `users/${userId}/settings/wedding`;
  try {
    const docRef = doc(db, path);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 2. Budget Items Sync
export function subscribeBudgetItems(
  userId: string,
  onUpdate: (items: BudgetItem[]) => void
) {
  const path = `users/${userId}/budget`;
  const colRef = collection(db, path);

  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: BudgetItem[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as BudgetItem);
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveBudgetItem(userId: string, item: BudgetItem): Promise<void> {
  const path = `users/${userId}/budget/${item.id}`;
  try {
    const docRef = doc(db, 'users', userId, 'budget', item.id);
    await setDoc(docRef, {
      ...item,
      userId,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteBudgetItem(userId: string, itemId: string): Promise<void> {
  const path = `users/${userId}/budget/${itemId}`;
  try {
    const docRef = doc(db, 'users', userId, 'budget', itemId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 3. Guests Sync
export function subscribeGuests(
  userId: string,
  onUpdate: (guests: RoyalGuest[]) => void
) {
  const path = `users/${userId}/guests`;
  const colRef = collection(db, path);

  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: RoyalGuest[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as RoyalGuest);
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveGuest(userId: string, guest: RoyalGuest): Promise<void> {
  const path = `users/${userId}/guests/${guest.id}`;
  try {
    const docRef = doc(db, 'users', userId, 'guests', guest.id);
    await setDoc(docRef, {
      ...guest,
      userId,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// 4. Events Sync
export function subscribeEvents(
  userId: string,
  onUpdate: (events: CeremonialEvent[]) => void
) {
  const path = `users/${userId}/events`;
  const colRef = collection(db, path);

  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: CeremonialEvent[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as CeremonialEvent);
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveEvent(userId: string, event: CeremonialEvent): Promise<void> {
  const path = `users/${userId}/events/${event.id}`;
  try {
    const docRef = doc(db, 'users', userId, 'events', event.id);
    await setDoc(docRef, {
      ...event,
      userId,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
