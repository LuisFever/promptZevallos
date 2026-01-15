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

export interface Booking {
    id: number;
    clientName: string;
    eventName: string;
    date: number; // Day of month (simplified for demo)
    time: string;
    status: 'Confirmado' | 'Pendiente' | 'En Curso';
    total: number;
}

export interface Service {
    id: number;
    titulo: string;
    capacidad: string;
    precio: number;
    imagen: string;
    tags: string[];
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

    private bookingsSubject = new BehaviorSubject<Booking[]>([]);
    bookings$ = this.bookingsSubject.asObservable();

    private servicesSubject = new BehaviorSubject<Service[]>([]);
    services$ = this.servicesSubject.asObservable();

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

        // 4. Load BOOKINGS
        const storedBookings = localStorage.getItem('mock_bookings');
        if (storedBookings) {
            this.bookingsSubject.next(JSON.parse(storedBookings));
        } else {
            const defaults: Booking[] = [
                { id: 1, clientName: 'Tech Corp', eventName: 'Conferencia Tech', date: 5, time: '09:00 AM', status: 'Confirmado', total: 12000 },
                { id: 2, clientName: 'Familia Flores', eventName: 'Boda Flores', date: 13, time: '14:00 PM', status: 'Pendiente', total: 8500 },
                { id: 3, clientName: 'Empresa X', eventName: 'Aniversario', date: 15, time: '19:00 PM', status: 'En Curso', total: 5000 }
            ];
            this.bookingsSubject.next(defaults);
            this.saveBookings(defaults);
        }

        // 5. Load SERVICES
        const storedServices = localStorage.getItem('mock_services');
        if (storedServices) {
            this.servicesSubject.next(JSON.parse(storedServices));
        } else {
            const defaults: Service[] = [
                { id: 1, titulo: 'Salón Imperial', capacidad: '500 personas', precio: 3500, imagen: '🏛️', tags: ['Aire Acondicionado', 'Sonido Pro'] },
                { id: 2, titulo: 'Jardín de Recepciones', capacidad: '300 personas', precio: 2800, imagen: '🌳', tags: ['Outdoor', 'Iluminación LED'] },
                { id: 3, titulo: 'Paquete Boda Todo Incluido', capacidad: 'Personalizado', precio: 8000, imagen: '💍', tags: ['Catering', 'Decoración', 'DJ'] }
            ];
            this.servicesSubject.next(defaults);
            this.saveServices(defaults);
        }
    }

    // --- ACTIONS ---

    // Bookings
    addBooking(b: Booking) {
        const current = this.bookingsSubject.getValue();
        const updated = [...current, b];
        this.bookingsSubject.next(updated);
        this.saveBookings(updated);
    }

    updateBooking(b: Booking) {
        const current = this.bookingsSubject.getValue();
        const updated = current.map(item => item.id === b.id ? b : item);
        this.bookingsSubject.next(updated);
        this.saveBookings(updated);
    }
    private saveBookings(data: Booking[]) { if (typeof localStorage !== 'undefined') localStorage.setItem('mock_bookings', JSON.stringify(data)); }

    // Services
    updateService(s: Service) {
        const current = this.servicesSubject.getValue();
        const updated = current.map(item => item.id === s.id ? s : item);
        this.servicesSubject.next(updated);
        this.saveServices(updated);
    }
    private saveServices(data: Service[]) { if (typeof localStorage !== 'undefined') localStorage.setItem('mock_services', JSON.stringify(data)); }

    // Users
    addUser(user: User) {
        const current = this.usersSubject.getValue();
        const updated = [...current, user];
        this.usersSubject.next(updated);
        this.saveUsers(updated);
    }

    private saveUsers(data: User[]) { if (typeof localStorage !== 'undefined') localStorage.setItem('mock_users', JSON.stringify(data)); }

    updateUser(user: User) {
        const current = this.usersSubject.getValue();
        const updated = current.map(u => u.id === user.id ? user : u);
        this.usersSubject.next(updated);
        this.saveUsers(updated);
    }

    toggleUserStatus(userId: number) {
        const current = this.usersSubject.getValue();
        const updated = current.map(u => {
            if (u.id === userId) {
                return { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' } as User;
            }
            return u;
        });
        this.usersSubject.next(updated);
        this.saveUsers(updated);
    }

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

    addProduct(product: Product) {
        const current = this.productsSubject.getValue();
        const updated = [...current, product];
        this.productsSubject.next(updated);
        this.saveProducts(updated);
    }

    updateProduct(product: Product) {
        const current = this.productsSubject.getValue();
        const updated = current.map(p => p.id === product.id ? product : p);
        this.productsSubject.next(updated);
        this.saveProducts(updated);
    }

    deleteProduct(productId: number) {
        const current = this.productsSubject.getValue();
        const updated = current.filter(p => p.id !== productId);
        this.productsSubject.next(updated);
        this.saveProducts(updated);
    }

    // Transactions (Treasury)
    addTransaction(t: Transaction) {
        const current = this.transactionsSubject.getValue();
        const updated = [t, ...current]; // Newest first
        this.transactionsSubject.next(updated);
        this.saveTransactions(updated);
    }

    private saveTransactions(data: Transaction[]) { if (typeof localStorage !== 'undefined') localStorage.setItem('mock_transactions', JSON.stringify(data)); }
}
