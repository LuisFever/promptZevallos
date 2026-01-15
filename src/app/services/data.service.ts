import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    roleColor: string;
    status: 'Activo' | 'Inactivo';
}

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    image?: string;
    icon?: string;
}

export interface Transaction {
    id: number;
    concept: string;
    type: 'Ingreso' | 'Egreso';
    amount: number;
    category: string;
    date: string;
    method: string;
    status: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // State Management (Observables)
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    private productsSubject = new BehaviorSubject<Product[]>([]);
    products$ = this.productsSubject.asObservable();

    private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
    transactions$ = this.transactionsSubject.asObservable();

    constructor() {
        this.initData();
    }

    private initData() {
        if (typeof localStorage === 'undefined') return;

        // 1. Load USERS
        const storedUsers = localStorage.getItem('mock_users');
        if (storedUsers) {
            this.usersSubject.next(JSON.parse(storedUsers));
        } else {
            // Default Users
            const defaults: User[] = [
                { id: 1, name: 'Admin Zevallos', email: 'admin@villazevallos.com', role: 'Administrador', roleColor: 'bg-indigo-100 text-indigo-700', status: 'Activo' },
                { id: 2, name: 'Juan Perez', email: 'ventas@villazevallos.com', role: 'Ventas', roleColor: 'bg-emerald-100 text-emerald-700', status: 'Activo' },
                { id: 3, name: 'Ana Diaz', email: 'contabilidad@villazevallos.com', role: 'Finanzas', roleColor: 'bg-amber-100 text-amber-700', status: 'Activo' },
                { id: 4, name: 'Carlos Ruiz', email: 'logistica@villazevallos.com', role: 'Logística', roleColor: 'bg-blue-100 text-blue-700', status: 'Activo' },
                { id: 5, name: 'Seguridad', email: 'seguridad@villazevallos.com', role: 'Seguridad', roleColor: 'bg-slate-100 text-slate-700', status: 'Activo' }
            ];
            this.usersSubject.next(defaults);
            this.saveUsers(defaults);
        }

        // 2. Load PRODUCTS
        const storedProducts = localStorage.getItem('mock_products');
        if (storedProducts) {
            this.productsSubject.next(JSON.parse(storedProducts));
        } else {
            // Default Products
            const defaults: Product[] = [
                { id: 1, name: 'Coca Cola 500ml', category: 'Bebidas', price: 5.00, stock: 150, icon: '🥤' },
                { id: 2, name: 'Inca Kola 500ml', category: 'Bebidas', price: 5.00, stock: 140, icon: '🥤' },
                { id: 3, name: 'Cerveza Pilsen', category: 'Licores', price: 12.00, stock: 80, icon: '🍺' },
                { id: 4, name: 'Agua Mineral', category: 'Bebidas', price: 3.00, stock: 200, icon: '💧' },
                { id: 5, name: 'Piqueo Snaks', category: 'Alimentos', price: 8.00, stock: 50, icon: '🍟' },
            ];
            this.productsSubject.next(defaults);
            this.saveProducts(defaults);
        }

        // 3. Load TRANSACTIONS
        const storedTransactions = localStorage.getItem('mock_transactions');
        if (storedTransactions) {
            this.transactionsSubject.next(JSON.parse(storedTransactions));
        } else {
            const defaults: Transaction[] = [
                { id: 1, concept: 'Saldo Inicial Caja', type: 'Ingreso', amount: 500.00, category: 'Apertura', date: 'Hoy 08:00 AM', method: 'Efectivo', status: 'Procesado' }
            ];
            this.transactionsSubject.next(defaults);
            this.saveTransactions(defaults);
        }
    }

    // --- ACTIONS ---

    // Users
    addUser(user: User) {
        const current = this.usersSubject.getValue();
        const updated = [...current, user];
        this.usersSubject.next(updated);
        this.saveUsers(updated);
    }

    private saveUsers(data: User[]) { if (typeof localStorage !== 'undefined') localStorage.setItem('mock_users', JSON.stringify(data)); }

    // Products
    updateStock(productId: number, quantitySold: number) {
        const current = this.productsSubject.getValue();
        const updated = current.map(p => {
            if (p.id === productId) return { ...p, stock: p.stock - quantitySold };
            return p;
        });
        this.productsSubject.next(updated);
        this.saveProducts(updated);
    }

    private saveProducts(data: Product[]) { if (typeof localStorage !== 'undefined') localStorage.setItem('mock_products', JSON.stringify(data)); }

    // Transactions (Treasury)
    addTransaction(t: Transaction) {
        const current = this.transactionsSubject.getValue();
        const updated = [t, ...current]; // Newest first
        this.transactionsSubject.next(updated);
        this.saveTransactions(updated);
    }

    private saveTransactions(data: Transaction[]) { if (typeof localStorage !== 'undefined') localStorage.setItem('mock_transactions', JSON.stringify(data)); }
}
