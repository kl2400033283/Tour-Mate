'use client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

/**
 * Saves a homestay booking to Firestore.
 * @param {Firestore} firestore - The Firestore instance.
 * @param {string} userId - The user's ID.
 * @param {object} bookingDetails - The details of the booking.
 * @returns {Promise} A promise that resolves when the booking is saved.
 */
export function saveHomestayBooking(firestore, userId, bookingDetails) {
  if (!firestore || !userId) return Promise.reject('Firestore or user ID is missing.');
  
  const bookingsCol = collection(firestore, 'users', userId, 'homestayBookings');
  const dataToSave = {
    ...bookingDetails,
    userId,
    bookingDate: serverTimestamp(),
  };

  // Uses non-blocking write
  return addDocumentNonBlocking(bookingsCol, dataToSave);
}

/**
 * Saves a guide booking to Firestore.
 * @param {Firestore} firestore - The Firestore instance.
 * @param {string} userId - The user's ID.
 * @param {object} bookingDetails - The details of the booking.
 * @returns {Promise} A promise that resolves when the booking is saved.
 */
export function saveGuideBooking(firestore, userId, bookingDetails) {
  if (!firestore || !userId) return Promise.reject('Firestore or user ID is missing.');

  const bookingsCol = collection(firestore, 'users', userId, 'guideBookings');
  const dataToSave = {
    ...bookingDetails,
    userId,
    bookingDate: serverTimestamp(),
  };

  // Uses non-blocking write
  return addDocumentNonBlocking(bookingsCol, dataToSave);
}
