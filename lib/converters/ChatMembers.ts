import {collection, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from "@firebase/firestore";
import {DocumentData} from "firebase/firestore";
import {db} from "@/firebase";

export interface ChatMembers {
  userId: string;
  email: string;
  timestamp: Date | null;
  isAdmin: boolean;
  chatId: string;
  image: string;
}

const chatMembersConverter: FirestoreDataConverter<ChatMembers> = {
  toFirestore: function (member: ChatMembers): DocumentData {
    return {
      userId: member.userId,
      email: member.email,
      timestamp: member.timestamp,
      isAdmin: !!member.isAdmin,
      chatId: member.chatId,
      image: member.image,
    };
  },
  fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Subscription {
    const data = snapshot.data(options);
    const sub: Subscription = {
      id: snapshot.id,
      cancel_at_period_end: data.cancel_at_period_end,
      created: data.created,
      current_period_start: data.current_period_start,
      items: data.items,
      latest_invoice: data.latest_invoice,
      metadata: data.metadata,
      payment_method: data.payment_method,
      price: data.price,
      prices: data.prices,
      product: data.product,
      quantity: data.quantity,
      status: data.status,
      stripeLink: data.stripeLink,
      cancel_at: data.cancel_at,
      canceled_at: data.canceled_at,
      current_period_end: data.current_period_end,
      ended_at: data.ended_at,
      trial_start: data.trial_start,
      trial_end: data.trial_end,
      role: data.role,
    };

    return sub;
  }
}

export const subscriptionRef = (userId: string) => collection(db, 'customers', userId, 'subscriptions').withConverter(subscriptionConverter);
