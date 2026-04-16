import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Wallet, FileSpreadsheet, LayoutDashboard, PlusCircle, CheckCircle2, Circle,
  ArrowUpRight, ArrowDownRight, Download, Trash2, Save, Search, Info, Gift, Box, Calendar, 
  Wrench, QrCode, CreditCard, ChevronDown, ChevronUp, Copy, X, UploadCloud, Image as ImageIcon, 
  FileText, Lock, Loader2, Edit3, BookOpen, Heart
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';

// =====================================================================
// PENGATURAN DATABASE
// =====================================================================
const manualFirebaseConfig = {
  apiKey: "AIzaSyDXjOAVQKn49qS95NBw8n12dWNn05f9RKA",
  authDomain: "kas-rt-09-e0e0e.firebaseapp.com",
  projectId: "kas-rt-09-e0e0e",
  storageBucket: "kas-rt-09-e0e0e.firebasestorage.app",
  messagingSenderId: "866376485989",
  appId: "1:866376485989:web:b1d84ab54d87b8c8b68a8c",
  measurementId: "G-DP8KSH1MFB"
};

const envConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const firebaseConfig = envConfig || manualFirebaseConfig;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'kas-rt-09-app';

// --- DATA AWAL ---
const INITIAL_RESIDENTS = [
  { id: 1, name: 'BPK. KHAIDIR', block: 'CA12', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000, 1: 62000 }, 2026: {} } },
  { id: 2, name: 'BPK. BUDI', block: 'CA13', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } }, 
  { id: 3, name: 'BPK. SINGGIH', block: 'CA16', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000, 1: 62000 }, 2026: {} } },
  { id: 4, name: 'BPK. KUSNADI', block: 'CA15', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000, 1: 63000 }, 2026: {} } },
  { id: 5, name: 'BPK. A. DONI', block: 'CA17', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 6, name: 'BPK. FATUR', block: 'CA18', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 7, name: 'BPK. YUDI', block: 'CA19', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 8, name: 'BPK. FADLI', block: 'CA20', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 9, name: 'BPK. MATSANI', block: 'CA21', defaultAmount: 62000, payments: { 2024: {}, 2025: {}, 2026: {} } },
  { id: 10, name: 'BPK. DADANG', block: 'CA22', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 11, name: 'BPK. ALFONSUS', block: 'CB2', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } },
  { id: 12, name: 'BPK. ZULKARNAEN', block: 'CB3', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 13, name: 'BPK. SITUMARANG', block: 'CB3A', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 14, name: 'BPK. IQBAL', block: 'CB5', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 15, name: 'BPK. IVAN', block: 'CB6', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 16, name: 'BPK. SEPEK', block: 'CB7', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 17, name: 'BPK. PENDI', block: 'CB8', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 18, name: 'BPK. JOKO', block: 'CB9', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 19, name: 'BPK. YANSURI', block: 'CB10', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 20, name: 'BPK. IWAN', block: 'CB11', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 21, name: 'BPK. GIRO', block: 'CB01', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 22, name: 'BPK. HILMAN', block: 'CA14', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 23, name: 'IBU DEDE SUYETI', block: 'CB12', defaultAmount: 72000, payments: { 2024: {}, 2025: { 0: 72000 }, 2026: {} } },
  { id: 24, name: 'BPK. ERVAN', block: 'CB15', defaultAmount: 74000, payments: { 2024: {}, 2025: { 0: 74000 }, 2026: {} } },
  { id: 25, name: 'IBU MELI', block: 'CB14', defaultAmount: 70000, payments: { 2024: {}, 2025: { 0: 70000 }, 2026: {} } },
  { id: 26, name: 'BPK. HERI', block: 'CB16', defaultAmount: 100000, payments: { 2024: {}, 2025: { 0: 100000 }, 2026: {} } },
  { id: 27, name: 'BPK. MULYADI', block: 'CB17', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 28, name: 'BPK. DWI', block: 'CB19A', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 29, name: 'BPK. TRI', block: 'CB18', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 30, name: 'BPK. NUNUNG', block: 'CB20', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 31, name: 'BPK. JOKO', block: 'CB19B', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } },
  { id: 32, name: 'BPK. IWAN', block: 'CB21', defaultAmount: 60000, payments: { 2024: {}, 2025: { 0: 60000 }, 2026: {} } },
  { id: 33, name: 'BPK. HARIYANTO', block: 'CC1', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 34, name: 'BPK. AGUS H', block: 'CC2', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 35, name: 'BPK. IWAN D', block: 'CC3', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 36, name: 'BPK. ARIS', block: 'CC8', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 37, name: 'BPK. AGUS CIK', block: 'CC8A', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 38, name: 'BPK. TEGUH', block: 'CC9', defaultAmount: 60000, payments: { 2024: {}, 2025: { 0: 60000 }, 2026: {} } },
  { id: 39, name: 'BPK. ENDI', block: 'CC12', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 40, name: 'BPK. ASEP', block: 'CC14', defaultAmount: 60000, payments: { 2024: {}, 2025: { 0: 60000 }, 2026: {} } },
  { id: 41, name: 'BPK. PRIYO', block: 'CC16', defaultAmount: 66000, payments: { 2024: {}, 2025: { 0: 66000 }, 2026: {} } },
  { id: 42, name: 'BPK. CHARLES', block: 'CC16A', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 43, name: 'BPK. TOMSON', block: 'CC16B', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 44, name: 'BPK. ROMA', block: 'CC16C', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } },
  { id: 45, name: 'BPK. DIKY', block: 'CC17', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 46, name: 'BPK. RAFAEL', block: 'CD1', defaultAmount: 59000, payments: { 2024: {}, 2025: { 0: 59000 }, 2026: {} } },
  { id: 47, name: 'BPK. RUSTAM', block: 'CD2', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } },
  { id: 48, name: 'BPK. EKKI', block: 'CD3A', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 49, name: 'BPK. HORI', block: 'CD6', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 50, name: 'BPK. ALBAR', block: 'CD6', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } },
  { id: 51, name: 'BPK. ESMANSYAH', block: 'CD7', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 52, name: 'BPK. FERI', block: 'CD8', defaultAmount: 63000, payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} } },
  { id: 53, name: 'BPK. AJID', block: 'CD9', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } },
  { id: 54, name: 'BPK. WAHYUDI', block: 'CD10', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 55, name: 'BPK. HENDRIK', block: 'CD12', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 56, name: 'BPK. WARSITO', block: 'CD12A', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 57, name: 'BPK. RIZAL', block: 'CD14', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} } },
  { id: 58, name: 'IBU DISTIRA', block: 'CE3', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 59, name: 'BPK. ASYID', block: 'CE3A', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 60, name: 'BPK. FAISAL', block: 'CE5', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 61, name: 'BPK. YOSA', block: 'CE8', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
  { id: 62, name: 'BPK. DERI', block: 'CE2', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 63, name: 'BPK. AMIR', block: 'CE1', defaultAmount: 61000, payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} } },
  { id: 64, name: 'BPK. ARIF', block: 'CD15', defaultAmount: 62000, payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} } },
];

const INITIAL_RESIDENTS_FILLED = INITIAL_RESIDENTS.map(r => {
  const fullYear = { 0: r.defaultAmount, 1: r.defaultAmount, 2: r.defaultAmount, 3: r.defaultAmount, 4: r.defaultAmount, 5: r.defaultAmount, 6: r.defaultAmount, 7: r.defaultAmount, 8: r.defaultAmount, 9: r.defaultAmount, 10: r.defaultAmount, 11: r.defaultAmount };
  const q1_2026 = { 0: r.defaultAmount, 1: r.defaultAmount, 2: r.defaultAmount };
  return { ...r, payments: { ...r.payments, 2024: fullYear, 2025: fullYear, 2026: q1_2026 } };
});

const INITIAL_TRANSACTIONS = [
  { id: 101, date: '12 Jan 2025', month: 0, type: 'out', category: 'Gaji Petugas Keamanan', amount: 1180000, description: 'Gaji Januari' },
  { id: 102, date: '12 Jan 2025', month: 0, type: 'out', category: 'Gaji Petugas Kebersihan', amount: 1080000, description: 'Gaji Januari' },
  { id: 103, date: '15 Jan 2025', month: 0, type: 'out', category: 'Kas RW', amount: 59000, description: 'Setoran RW Jan' },
  { id: 104, date: '15 Jan 2025', month: 0, type: 'out', category: 'Iuran Posyandu', amount: 59000, description: 'Setoran Posyandu Jan' },
  { id: 105, date: '15 Jan 2025', month: 0, type: 'out', category: 'LSK', amount: 234000, description: 'Setoran LSK Jan' },
  { id: 106, date: '20 Jan 2025', month: 0, type: 'out', category: 'Perbaikan/Perawatan', amount: 245000, description: 'Perbaikan gapura' },
  { id: 107, date: '25 Jan 2025', month: 0, type: 'out', category: 'Kegiatan 17 Agustus, Pengajian, dll', amount: 250000, description: 'Pengajian rutin' },
  { id: 108, date: '28 Jan 2025', month: 0, type: 'in', category: 'Dana Program Inventaris RT', amount: 1000000, description: 'Sumbangan' },
];

const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

// Diubah agar tahun pilihan menyesuaikan terus ke masa depan (2024 s/d 2030)
const YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

// =====================================================================
// KOMPONEN UTAMA APLIKASI KAS RT
// =====================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  const [userRole, setUserRole] = useState('GUEST');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentMonthIdx, setCurrentMonthIdx] = useState(new Date().getMonth());
  const [saldoAwalTahun, setSaldoAwalTahun] = useState(1168500); 

  const [residents, setResidents] = useState(INITIAL_RESIDENTS_FILLED);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [agendas, setAgendas] = useState([]);
  const [assets, setAssets] = useState([]); // Aset disesuaikan default kosong seperti sebelumnya
  const [pengajianData, setPengajianData] = useState({ saldo: 0, info: '' });

  const [showQrisModal, setShowQrisModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // State tahun otomatis mengikuti tahun berjalan di kalender (misal: 2026, nanti 2027 dst)
  const currentYearAuto = new Date().getFullYear();
  const [searchIuran, setSearchIuran] = useState('');
  const [selectedYearIuran, setSelectedYearIuran] = useState(currentYearAuto);
  const [searchThr, setSearchThr] = useState('');
  const [selectedYearThr, setSelectedYearThr] = useState(currentYearAuto);
  const [selectedYearLaporan, setSelectedYearLaporan] = useState(currentYearAuto);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDbLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { 
        console.error("Auth info:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'appState', 'mainData');
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) {
        setDoc(docRef, {
          residents: INITIAL_RESIDENTS_FILLED,
          transactions: INITIAL_TRANSACTIONS,
          agendas: [],
          assets: [],
          saldoAwalTahun: 1168500,
          pengajianData: { saldo: 0, info: '' }
        }).catch((err) => console.log("Lokal mode aktif."));
      } else {
        const data = snapshot.data();
        if(data.saldoAwalTahun !== undefined) setSaldoAwalTahun(data.saldoAwalTahun);
        if(data.residents) setResidents(data.residents);
        if(data.transactions) setTransactions(data.transactions);
        if(data.agendas) setAgendas(data.agendas);
        if(data.assets) setAssets(data.assets);
        if(data.pengajianData) setPengajianData(data.pengajianData);
      }
      setDbLoading(false);
    }, (err) => {
      setDbLoading(false);
    });
    return () => unsub();
  }, [user]);

  const saveToDatabase = async (key, dataToSave) => {
    if(!user || userRole !== 'PENGURUS') return;
    try {
      const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'appState', 'mainData');
      await setDoc(docRef, { [key]: dataToSave }, { merge: true });
    } catch (err) {
      console.log("Sinkronisasi cloud ditunda.");
    }
  };

  const formatRp = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);
  };

  const laporanData = useMemo(() => {
    let laporan = [];
    let saldoBulanSebelumnya = saldoAwalTahun;
    for (let m = 0; m < 12; m++) {
      let totalIuranBulanIni = 0;
      residents.forEach(res => {
        // Hanya menghitung iuran berdasarkan tahun yang sedang dipilih di Laporan
        const pay = res.payments[selectedYearLaporan] ? res.payments[selectedYearLaporan][m] : undefined;
        if (pay === 'LUNAS') totalIuranBulanIni += (res.defaultAmount * 12); 
        else if (typeof pay === 'number') totalIuranBulanIni += pay;
      });
      
      // Filter transaksi agar hanya yang sesuai tahun laporan yang ditarik
      const transBulanIni = transactions.filter(t => {
        if (t.month !== m) return false;
        if (!t.date) return true;
        return t.date.includes(selectedYearLaporan.toString());
      });

      const penerimaanLain = transBulanIni.filter(t => t.type === 'in').reduce((sum, t) => sum + t.amount, 0);
      const totalPenerimaan = totalIuranBulanIni + penerimaanLain;
      const filterPengeluaran = (kategori) => transBulanIni.filter(t => t.type === 'out' && t.category === kategori).reduce((sum, t) => sum + t.amount, 0);
      const rutin = {
        keamanan: filterPengeluaran('Gaji Petugas Keamanan'),
        kebersihan: filterPengeluaran('Gaji Petugas Kebersihan'),
        kasRW: filterPengeluaran('Kas RW'),
        posyandu: filterPengeluaran('Iuran Posyandu'),
        lsk: filterPengeluaran('LSK'),
        adminBank: filterPengeluaran('Admin BANK'),
      };
      const totalRutin = Object.values(rutin).reduce((a, b) => a + b, 0);
      const tidakRutin = {
        thr: filterPengeluaran('THR'),
        perbaikan: filterPengeluaran('Perbaikan/Perawatan'),
        rapat: filterPengeluaran('Biaya Rapat/Pertemuan'),
        kegiatan: filterPengeluaran('Kegiatan 17 Agustus, Pengajian, dll'),
        sosial: filterPengeluaran('Dana Sosial'),
        gorong: filterPengeluaran('Gorol /jasa kebersihan'),
      };
      const totalTidakRutin = Object.values(tidakRutin).reduce((a, b) => a + b, 0);
      const surplusDefisit = totalPenerimaan - totalRutin - totalTidakRutin;
      const saldoAkhir = saldoBulanSebelumnya + surplusDefisit;
      laporan.push({
        monthName: MONTHS[m],
        saldoAwal: saldoBulanSebelumnya,
        penerimaan: { iuran: totalIuranBulanIni, lain: penerimaanLain, total: totalPenerimaan },
        rutin, totalRutin, tidakRutin, totalTidakRutin, surplusDefisit, saldoAkhir
      });
      saldoBulanSebelumnya = saldoAkhir;
    }
    return laporan;
  }, [residents, transactions, saldoAwalTahun, selectedYearLaporan]);

  if (dbLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-green-700">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <h2 className="font-bold">Menyiapkan Aplikasi...</h2>
      </div>
    );
  }

  if (userRole === 'GUEST') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans flex justify-center">
        <div className="w-full max-w-md bg-slate-50 min-h-screen relative shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
            <img src="/logo-bogor.png" alt="" className="w-[150%] max-w-none blur-sm" />
          </div>

          <img src="/logo-bogor.png" alt="Logo Bogor" className="w-20 h-20 object-contain mb-4 drop-shadow-sm z-10" onError={(e) => e.target.style.display='none'} />
          
          <h1 className="text-2xl font-extrabold text-green-700 tracking-tight mb-1 text-center z-10">VILLA PERMATA MAS 1</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 text-center z-10">Sistem Kas RT 09/18</p>
          
          <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4 z-10">
             <h2 className="text-sm font-bold text-slate-700 mb-4 text-center">Pilih Mode Akses:</h2>
             
             <button onClick={() => setUserRole('WARGA')} className="w-full py-3.5 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 hover:bg-blue-100 transition flex items-center justify-center gap-3 shadow-sm">
                <Users className="w-5 h-5" /> Masuk Sebagai Warga (Hanya Lihat)
             </button>
             
             <button onClick={() => setShowPinModal(true)} className="w-full py-3.5 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 hover:bg-green-100 transition flex items-center justify-center gap-3 shadow-sm">
                <Lock className="w-5 h-5" /> Masuk Sebagai Pengurus (Kelola)
             </button>
          </div>

          {showPinModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm z-20">
              <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-xs relative animate-in fade-in zoom-in duration-200">
                <button onClick={() => {setShowPinModal(false); setPin(''); setPinError(false);}} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5"/></button>
                <h3 className="font-bold text-slate-800 mb-4 text-center">PIN Pengurus</h3>
                <input type="password" maxLength={6} autoFocus value={pin} onChange={(e) => {setPin(e.target.value); setPinError(false);}} placeholder="******" className={`w-full text-center text-2xl tracking-[0.5em] font-bold p-3 border rounded-xl focus:ring-green-500 focus:border-green-500 mb-2 ${pinError ? 'border-red-500 text-red-600 bg-red-50' : 'border-slate-300'}`} />
                {pinError && <p className="text-xs text-red-500 text-center font-semibold mb-3">PIN Salah! Coba lagi.</p>}
                <button onClick={() => { if (pin === '123123') { setUserRole('PENGURUS'); setShowPinModal(false); setPinError(false); } else { setPinError(true); } }} className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 mt-2 shadow-md">Lanjutkan</button>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-6 left-0 right-0 text-center z-10">
             <p className="text-[10px] text-slate-400 font-bold tracking-widest">crafted by ivan rahman</p>
          </div>

        </div>
      </div>
    );
  }

  const PengajianView = () => {
    const [isEditingPengajian, setIsEditingPengajian] = useState(false);
    const [tempPengajian, setTempPengajian] = useState(0);
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [tempInfo, setTempInfo] = useState('');
    const handleSavePengajian = () => { const newData = { ...pengajianData, saldo: Number(tempPengajian) }; setPengajianData(newData); saveToDatabase('pengajianData', newData); setIsEditingPengajian(false); };
    const handleSaveInfo = () => { const newData = { ...pengajianData, info: tempInfo }; setPengajianData(newData); saveToDatabase('pengajianData', newData); setIsEditingInfo(false); };
    return (
      <div className="space-y-4 pb-12">
        <h2 className="text-lg font-bold text-emerald-800">Saldo Pengajian</h2>
        <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100">
          <h3 className="text-xs font-bold text-emerald-600 mb-2 uppercase">Total Saldo</h3>
          {isEditingPengajian && userRole === 'PENGURUS' ? (
             <div className="flex items-center gap-2">
               <input type="number" value={tempPengajian} onChange={e => setTempPengajian(e.target.value)} className="w-full text-lg font-bold p-2 rounded-xl border border-emerald-200 text-emerald-800 focus:outline-none" autoFocus />
               <button onClick={handleSavePengajian} className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl"><Save className="w-5 h-5"/></button>
               <button onClick={() => setIsEditingPengajian(false)} className="bg-slate-300 hover:bg-slate-400 text-slate-700 p-2 rounded-xl"><X className="w-5 h-5"/></button>
             </div>
          ) : (
             <div className="text-3xl font-extrabold text-emerald-700 flex items-center justify-between">
               {formatRp(pengajianData.saldo)}
               {userRole === 'PENGURUS' && (
                 <button onClick={() => { setIsEditingPengajian(true); setTempPengajian(pengajianData.saldo); }} className="text-emerald-400 hover:text-emerald-600 p-2 bg-emerald-100 rounded-full"><Edit3 className="w-5 h-5" /></button>
               )}
             </div>
          )}
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-xs font-bold text-slate-500 mb-2 uppercase">Input Informasi Manual</h3>
           {isEditingInfo && userRole === 'PENGURUS' ? (
             <div className="space-y-2">
               <textarea value={tempInfo} onChange={e => setTempInfo(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none min-h-[100px]" placeholder="Ketik informasi manual di sini..." />
               <div className="flex gap-2">
                 <button onClick={() => setIsEditingInfo(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold">Batal</button>
                 <button onClick={handleSaveInfo} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold flex justify-center items-center gap-2"><Save className="w-4 h-4"/> Simpan</button>
               </div>
             </div>
           ) : (
             <div className="relative">
               <div className="text-sm text-slate-700 whitespace-pre-line min-h-[60px] p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {pengajianData.info || <span className="text-slate-400 italic">Klik ikon pensil untuk tambah informasi...</span>}
               </div>
               {userRole === 'PENGURUS' && (
                 <button onClick={() => { setIsEditingInfo(true); setTempInfo(pengajianData.info || ''); }} className="absolute top-2 right-2 text-slate-400 hover:text-emerald-600 p-1"><Edit3 className="w-4 h-4" /></button>
               )}
             </div>
           )}
        </div>
      </div>
    );
  };

  const DashboardView = () => {
    const dataBulanIni = laporanData[currentMonthIdx];
    const [isEditingSaldo, setIsEditingSaldo] = useState(false);
    const [tempSaldo, setTempSaldo] = useState(0);
    const handleSaveSaldo = () => { const targetSaldo = Number(tempSaldo) || 0; const sumSurplus = dataBulanIni.saldoAkhir - saldoAwalTahun; const newSaldoAwalTahun = targetSaldo - sumSurplus; setSaldoAwalTahun(newSaldoAwalTahun); saveToDatabase('saldoAwalTahun', newSaldoAwalTahun); setIsEditingSaldo(false); };
    const handleCopy = () => { const textField = document.createElement('textarea'); textField.innerText = '1170011106804'; document.body.appendChild(textField); textField.select(); document.execCommand('copy'); textField.remove(); setCopied(true); setTimeout(() => setCopied(false), 2000); };
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          {userRole === 'WARGA' && <div className="absolute top-0 right-0 bg-white/20 text-[10px] px-3 py-1 rounded-bl-xl font-bold">MODE: HANYA LIHAT</div>}
          <h2 className="text-sm font-medium text-green-100 mb-1">Saldo Akhir Kas RT (Bulan {MONTHS[currentMonthIdx]})</h2>
          {isEditingSaldo && userRole === 'PENGURUS' ? (
            <div className="mb-4 bg-white/10 p-3 rounded-lg border border-green-400/30">
              <label className="text-xs text-green-100 block mb-1">Sesuaikan Saldo Kas Saat Ini (Rp):</label>
              <div className="flex items-center gap-2">
                <input type="number" value={tempSaldo} onChange={e => setTempSaldo(e.target.value)} className="text-slate-800 p-1.5 rounded w-full text-sm font-bold outline-none" autoFocus />
                <button onClick={handleSaveSaldo} className="bg-green-500 hover:bg-green-400 text-white p-1.5 rounded transition"><Save className="w-5 h-5"/></button>
                <button onClick={() => setIsEditingSaldo(false)} className="bg-red-500 hover:bg-red-400 text-white p-1.5 rounded transition"><X className="w-5 h-5"/></button>
              </div>
            </div>
          ) : (
            <div className="text-3xl font-bold mb-4 flex items-center gap-3">
              {formatRp(dataBulanIni.saldoAkhir)}
              {userRole === 'PENGURUS' && (
                <button onClick={() => { setIsEditingSaldo(true); setTempSaldo(dataBulanIni.saldoAkhir); }} className="text-green-200 hover:text-white p-1.5 bg-white/10 rounded-full transition" title="Edit Saldo"><Edit3 className="w-4 h-4" /></button>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/20 pt-4">
            <div>
              <div className="flex items-center text-green-100 text-xs mb-1"><ArrowUpRight className="w-4 h-4 mr-1" /> Pemasukan Bln Ini</div>
              <div className="font-semibold">{formatRp(dataBulanIni.penerimaan.total)}</div>
            </div>
            <div>
              <div className="flex items-center text-red-200 text-xs mb-1"><ArrowDownRight className="w-4 h-4 mr-1" /> Pengeluaran Bln Ini</div>
              <div className="font-semibold">{formatRp(dataBulanIni.totalRutin + dataBulanIni.totalTidakRutin)}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setActiveTab('iuran')} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition">
            <div className="bg-blue-100 p-2.5 rounded-full text-blue-600"><Users className="w-5 h-5" /></div>
            <span className="text-[11px] font-semibold text-slate-700">IURAN</span>
          </button>
          <button onClick={() => setActiveTab('kas')} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition">
            <div className="bg-orange-100 p-2.5 rounded-full text-orange-600"><Wallet className="w-5 h-5" /></div>
            <span className="text-[11px] font-semibold text-slate-700">Pengeluaran</span>
          </button>
          <button onClick={() => setActiveTab('thr')} className="bg-yellow-50 p-3 rounded-2xl shadow-sm border border-yellow-200 flex flex-col items-center justify-center gap-2 hover:bg-yellow-100 transition relative overflow-hidden">
            <div className="bg-yellow-100 p-2.5 rounded-full text-yellow-600"><Gift className="w-5 h-5" /></div>
            <span className="text-[11px] font-semibold text-yellow-800 text-center leading-tight">Iuran THR</span>
          </button>
          <button onClick={() => setActiveTab('pengajian')} className="bg-emerald-50 p-3 rounded-2xl shadow-sm border border-emerald-200 flex flex-col items-center justify-center gap-2 hover:bg-emerald-100 transition relative overflow-hidden">
            <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600"><BookOpen className="w-5 h-5" /></div>
            <span className="text-[11px] font-semibold text-emerald-800 text-center leading-tight uppercase">Saldo Pengajian</span>
          </button>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 relative">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-600" /> Info Rekening & Pembayaran</h3>
          <div className="flex items-center gap-4">
            <div onClick={() => setShowQrisModal(true)} className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-200 shrink-0 cursor-pointer hover:bg-blue-100 transition relative group shadow-sm overflow-hidden">
               <img src="/qris.jpeg" alt="QR" className="w-full h-full object-cover p-1 mix-blend-multiply" onError={(e) => e.target.src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=1170011106804'} />
               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"><Search className="w-5 h-5 text-slate-700 bg-white rounded-full p-1 shadow-sm" /></div>
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-[11px] text-slate-500 font-medium">Bank Mandiri</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-800 tracking-wider text-sm">1170011106804</p>
                <button onClick={handleCopy} className={`p-1.5 rounded-md transition ${copied ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}</button>
              </div>
              <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">A.N. IVAN RAHMAN</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const IuranView = () => {
    const togglePaymentGrid = (residentId, m) => { 
      if (userRole !== 'PENGURUS') return; 
      const newResidents = residents.map(r => { 
        if (r.id === residentId) { 
          const newPayments = { ...r.payments }; 
          if (!newPayments[selectedYearIuran]) newPayments[selectedYearIuran] = {}; 
          if (Object.values(newPayments[selectedYearIuran]).includes('LUNAS')) { 
            for(let i=0; i<12; i++) newPayments[selectedYearIuran][i] = r.defaultAmount; 
          } 
          if (newPayments[selectedYearIuran][m]) delete newPayments[selectedYearIuran][m]; 
          else newPayments[selectedYearIuran][m] = r.defaultAmount; 
          return { ...r, payments: newPayments }; 
        } 
        return r; 
      }); 
      setResidents(newResidents); 
      saveToDatabase('residents', newResidents); 
    };
    const filteredWarga = residents.filter(r => r.name.toLowerCase().includes(searchIuran.toLowerCase()) || r.block.toLowerCase().includes(searchIuran.toLowerCase()) );
    return (
      <div className="h-[75vh] flex flex-col space-y-3">
        <div className="flex items-center justify-between shrink-0">
          <div><h2 className="text-lg font-bold text-slate-800">Pencatatan Iuran</h2><p className="text-xs text-slate-500">Pilih tahun riwayat.</p></div>
          <select value={selectedYearIuran} onChange={(e) => setSelectedYearIuran(Number(e.target.value))} className="bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg focus:ring-green-500 block p-2 shadow-sm"> {YEARS.map(y => <option key={y} value={y}>Tahun {y}</option>)} </select>
        </div>
        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 shrink-0">
          <h3 className="text-xs font-bold text-blue-800 mb-2 flex items-center gap-1"><Info className="w-4 h-4"/> Rincian Iuran Bulanan (Pokok: Rp 58.000)</h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-blue-700"> <p>a. Uang Sampah: Rp20.000</p> <p>b. Uang Keamanan: Rp20.000</p> <p>c. Kas RW: Rp1.000</p> <p>d. Kas RT: Rp13.000</p> <p>e. Uang Sosial: Rp3.000</p> <p>f. Posyandu: Rp1.000</p> </div>
        </div>
        <div className="relative shrink-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><Search className="w-4 h-4 text-slate-400" /></div>
          <input type="text" className="bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-green-500 block w-full pl-10 p-3" placeholder="Cari nama warga atau blok..." value={searchIuran} onChange={(e) => setSearchIuran(e.target.value)} />
        </div>
        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative">
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600"><tr><th className="sticky top-0 left-0 bg-slate-100 p-3 z-30 shadow-sm whitespace-nowrap">Nama Warga</th>{MONTHS.map((m, i) => (<th key={i} className="sticky top-0 bg-slate-50 p-3 text-center min-w-[50px] font-semibold z-20 shadow-sm">{m.slice(0,3)}</th>))}</tr></thead>
              <tbody className="divide-y divide-slate-100">{filteredWarga.map((warga) => (<tr key={warga.id} className="hover:bg-slate-50 transition"><td className="sticky left-0 bg-white p-3 z-10 shadow-sm flex flex-col whitespace-nowrap"><span className="font-semibold text-slate-800">{warga.name}</span><span className="text-[10px] text-slate-500">{warga.block} • {formatRp(warga.defaultAmount)}</span></td>{MONTHS.map((m, i) => { const paymentsYear = warga.payments[selectedYearIuran] || {}; const isPaid = paymentsYear[i] || Object.values(paymentsYear).includes('LUNAS'); return (<td key={i} className={`p-2 text-center border-l border-slate-50 ${userRole === 'PENGURUS' ? 'cursor-pointer hover:bg-slate-100' : 'cursor-default'}`} onClick={() => togglePaymentGrid(warga.id, i)}><div className="flex justify-center items-center h-full">{isPaid ? (<CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100" />) : (<Circle className="w-6 h-6 text-slate-200 hover:text-green-300" />)}</div></td>);})}</tr>))}</tbody>
              <tfoot className="bg-green-50 font-semibold relative z-20">
                <tr>
                  <td className="sticky bottom-0 left-0 bg-green-100 p-3 z-30 shadow-sm text-green-800 text-[11px] whitespace-nowrap">Total Terkumpul</td>
                  {MONTHS.map((_, i) => {
                    const totalMth = filteredWarga.reduce((sum, r) => {
                      const paymentsYear = r.payments[selectedYearIuran] || {};
                      const isLunas = Object.values(paymentsYear).includes('LUNAS');
                      const val = isLunas ? r.defaultAmount : (paymentsYear[i] || 0);
                      return sum + val;
                    }, 0);
                    return (
                      <td key={i} className="sticky bottom-0 z-20 bg-green-50 p-2 text-center border-l border-green-100 text-[10px] text-green-700 whitespace-nowrap shadow-sm">
                        {totalMth > 0 ? (totalMth / 1000).toLocaleString('id-ID') + 'K' : '-'}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const ThrView = () => {
    const toggleThrPayment = (residentId) => { 
      if (userRole !== 'PENGURUS') return; 
      const newResidents = residents.map(r => { 
        if (r.id === residentId) { 
          const currentThr = r.thrPayments || {}; 
          return { ...r, thrPayments: { ...currentThr, [selectedYearThr]: !currentThr[selectedYearThr] } }; 
        } 
        return r; 
      }); 
      setResidents(newResidents); 
      saveToDatabase('residents', newResidents); 
    };
    const filteredWarga = residents.filter(r => r.name.toLowerCase().includes(searchThr.toLowerCase()) || r.block.toLowerCase().includes(searchThr.toLowerCase()));
    const thrNominal = 50000;
    const totalTerkumpul = filteredWarga.reduce((sum, r) => sum + (r.thrPayments?.[selectedYearThr] ? thrNominal : 0), 0);
    return (
      <div className="h-[75vh] flex flex-col space-y-3">
        <div className="flex items-center justify-between shrink-0"><div><h2 className="text-lg font-bold text-yellow-800">Pencatatan Iuran THR</h2><p className="text-xs text-yellow-600">Rp 50.000 / Warga</p></div> <select value={selectedYearThr} onChange={(e) => setSelectedYearThr(Number(e.target.value))} className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm font-semibold rounded-lg block p-2 shadow-sm"> {YEARS.map(y => <option key={y} value={y}>Tahun {y}</option>)} </select></div>
        <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200 flex justify-between items-center shrink-0"><span className="text-sm font-bold text-yellow-800">Total Terkumpul:</span><span className="text-lg font-extrabold text-yellow-700">{formatRp(totalTerkumpul)}</span></div>
        <div className="relative shrink-0"><div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><Search className="w-4 h-4 text-slate-400" /></div><input type="text" className="bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-yellow-500 block w-full pl-10 p-3" placeholder="Cari nama warga atau blok..." value={searchThr} onChange={(e) => setSearchThr(e.target.value)} /></div>
        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
          <div className="overflow-auto flex-1">
            <div className="divide-y divide-slate-100">
              {filteredWarga.map((warga) => { const isPaid = warga.thrPayments?.[selectedYearThr]; return (<div key={warga.id} className={`p-4 flex items-center justify-between transition ${isPaid ? 'bg-yellow-50/30' : 'hover:bg-slate-50'} ${userRole === 'PENGURUS' ? 'cursor-pointer' : 'cursor-default'}`} onClick={() => toggleThrPayment(warga.id)}> <div><div className="font-semibold text-slate-800 text-sm">{warga.name}</div><div className="text-xs text-slate-500 mt-0.5">Blok: {warga.block}</div></div> <div className="flex items-center gap-3"> {isPaid ? (<span className="text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">LUNAS</span>) : (<span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">BELUM</span>)} <div>{isPaid ? (<CheckCircle2 className="w-7 h-7 text-yellow-500 fill-yellow-100" />) : (<Circle className="w-7 h-7 text-slate-300" />)}</div> </div> </div>)})}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KasView = () => {
    const [selectedMth, setSelectedMth] = useState(currentMonthIdx);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [tType, setTType] = useState('out');
    const [tCategory, setTCategory] = useState('Gaji Petugas Keamanan');
    const [tAmount, setTAmount] = useState('');
    const [tDesc, setTDesc] = useState('');
    const currentTrans = transactions.filter(t => t.month === selectedMth);
    const handleSave = (e) => { e.preventDefault(); if (editingId) { const updatedTransactions = transactions.map(t => t.id === editingId ? { ...t, type: tType, category: tCategory, amount: Number(tAmount), description: tDesc } : t); setTransactions(updatedTransactions); saveToDatabase('transactions', updatedTransactions); setEditingId(null); } else { const today = new Date(); const formattedDate = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); const newT = { id: Date.now(), date: formattedDate, month: selectedMth, type: tType, category: tCategory, amount: Number(tAmount), description: tDesc }; const newTransactions = [...transactions, newT]; setTransactions(newTransactions); saveToDatabase('transactions', newTransactions); } setShowForm(false); setTAmount(''); setTDesc(''); };
    const deleteTrans = (id) => { const newTransactions = transactions.filter(t => t.id !== id); setTransactions(newTransactions); saveToDatabase('transactions', newTransactions); };
    const categoriesOut = ['Gaji Petugas Keamanan', 'Gaji Petugas Kebersihan', 'Kas RW', 'Iuran Posyandu', 'LSK', 'Admin BANK', 'THR', 'Perbaikan/Perawatan', 'Biaya Rapat/Pertemuan', 'Kegiatan 17 Agustus, Pengajian, dll', 'Dana Sosial', 'Gorol /jasa kebersihan'];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2"><h2 className="text-lg font-bold text-slate-800">Buku Kas Operasional</h2> <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg block p-2" value={selectedMth} onChange={(e) => setSelectedMth(Number(e.target.value))}> {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)} </select></div>
        {!showForm && userRole === 'PENGURUS' && (<button onClick={() => { setShowForm(true); setEditingId(null); setTAmount(''); setTDesc(''); setTType('out'); setTCategory('Gaji Petugas Keamanan'); }} className="w-full bg-slate-800 text-white p-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-700 shadow-sm"><PlusCircle className="w-5 h-5" /> Catat Transaksi Baru</button>)}
        {showForm && userRole === 'PENGURUS' && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2">
            <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">{editingId ? 'Edit Transaksi' : 'Transaksi Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setTType('out')} className={`py-2 text-sm font-medium rounded-lg border ${tType==='out' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-slate-200'}`}>Pengeluaran</button>
                <button type="button" onClick={() => setTType('in')} className={`py-2 text-sm font-medium rounded-lg border ${tType==='in' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-200'}`}>Pemasukan Lain</button>
              </div>
              {tType === 'out' ? (<select value={tCategory} onChange={(e) => setTCategory(e.target.value)} className="w-full border-slate-200 rounded-lg text-sm p-3 bg-slate-50">{categoriesOut.map(c => <option key={c} value={c}>{c}</option>)}</select>) : (<input type="text" value={tCategory} onChange={(e) => setTCategory(e.target.value)} placeholder="Kategori Pemasukan" className="w-full border border-slate-200 rounded-lg text-sm p-3" required />)}
              <input type="number" placeholder="Nominal (Rp)" value={tAmount} onChange={(e) => setTAmount(e.target.value)} className="w-full border border-slate-200 rounded-lg text-sm p-3" required />
              <input type="text" placeholder="Keterangan Lengkap (Opsional)" value={tDesc} onChange={(e) => setTDesc(e.target.value)} className="w-full border border-slate-200 rounded-lg text-sm p-3" />
              <div className="flex gap-2 pt-2"><button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">Batal</button> <button type="submit" className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"><Save className="w-4 h-4"/> Simpan</button></div>
            </form>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-4 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">Riwayat Bulan {MONTHS[selectedMth]}</div>
          <div className="divide-y divide-slate-100">
            {currentTrans.length === 0 ? (<div className="p-6 text-center text-slate-400 text-sm">Belum ada transaksi.</div>) : (
              currentTrans.map((t) => (<div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition"> <div className="flex-1"> <div className="flex items-center gap-2"> {t.type === 'in' ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />} <span className="font-semibold text-sm text-slate-800">{t.category}</span> </div> <div className="flex items-center gap-1 mt-1 ml-6 text-xs"> <span className="font-medium text-slate-500">{t.date || '-'}</span> {t.description && <span className="text-slate-400">• {t.description}</span>} </div> </div> <div className="text-right flex items-center gap-4"> <span className={`font-bold text-sm ${t.type === 'in' ? 'text-green-600' : 'text-slate-800'}`}>{t.type === 'out' ? '-' : '+'}{formatRp(t.amount)}</span> {userRole === 'PENGURUS' && (<div className="flex items-center gap-1"><button onClick={() => deleteTrans(t.id)} className="text-slate-300 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button></div>)} </div> </div>))
            )}
          </div>
        </div>
      </div>
    );
  };

  const LaporanView = () => {
    return (
      <div className="space-y-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <div><h2 className="text-lg font-bold text-slate-800">Laporan Kas RT 09/18</h2><p className="text-xs text-slate-500">Rekap Tahun {selectedYearLaporan} (Geser kanan)</p></div>
          <div className="flex items-center gap-2">
            <select value={selectedYearLaporan} onChange={(e) => setSelectedYearLaporan(Number(e.target.value))} className="bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg block p-2 shadow-sm"> {YEARS.map(y => <option key={y} value={y}>Tahun {y}</option>)} </select>
            <button className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200" title="Cetak Laporan"><Download className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="bg-slate-100 text-slate-700 uppercase"><tr><th className="sticky left-0 bg-slate-100 p-3 z-10 shadow-sm whitespace-nowrap min-w-[200px]">KETERANGAN</th>{MONTHS.map((m) => (<th key={m} className="px-3 py-3 border-b border-slate-200 text-right min-w-[90px]">{m}</th>))}</tr></thead>
              <tbody className="whitespace-nowrap">
                <tr className="bg-slate-50 font-bold border-b border-slate-200"><td className="sticky left-0 bg-slate-50 p-2 z-10 shadow-sm">(II) Penerimaan</td><td colSpan={12}></td></tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">1. Iuran Bulanan Warga</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{formatRp(d.penerimaan.iuran)}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">2. Penerimaan Lain-lain</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.penerimaan.lain > 0 ? formatRp(d.penerimaan.lain) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-200 bg-green-50 font-semibold text-green-800"><td className="sticky left-0 bg-green-50 p-2 text-right pr-4 z-10 shadow-sm">Jumlah (II)</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{formatRp(d.penerimaan.total)}</td>)}</tr>
                <tr className="bg-slate-50 font-bold border-b border-slate-200"><td className="sticky left-0 bg-slate-50 p-2 z-10 shadow-sm">(III) Pengeluaran Rutin</td><td colSpan={12}></td></tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">1. Gaji Petugas Keamanan</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.rutin.keamanan > 0 ? formatRp(d.rutin.keamanan) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">2. Gaji Petugas Kebersihan</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.rutin.kebersihan > 0 ? formatRp(d.rutin.kebersihan) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">3. Kas RW</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.rutin.kasRW > 0 ? formatRp(d.rutin.kasRW) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">4. Iuran Posyandu</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.rutin.posyandu > 0 ? formatRp(d.rutin.posyandu) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">5. LSK</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.rutin.lsk > 0 ? formatRp(d.rutin.lsk) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">6. Admin BANK</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.rutin.adminBank > 0 ? formatRp(d.rutin.adminBank) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-200 bg-red-50 font-semibold text-red-700"><td className="sticky left-0 bg-red-50 p-2 text-right pr-4 z-10 shadow-sm">Jumlah (III)</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{formatRp(d.totalRutin)}</td>)}</tr>
                <tr className="bg-slate-50 font-bold border-b border-slate-200"><td className="sticky left-0 bg-slate-50 p-2 z-10 shadow-sm">(IV) Pengeluaran Tidak Rutin</td><td colSpan={12}></td></tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">1. THR (Keamanan & Kebersihan)</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.tidakRutin.thr > 0 ? formatRp(d.tidakRutin.thr) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">2. Perbaikan/Perawatan</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.tidakRutin.perbaikan > 0 ? formatRp(d.tidakRutin.perbaikan) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">3. Biaya Rapat / Pertemuan</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.tidakRutin.rapat > 0 ? formatRp(d.tidakRutin.rapat) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">4. Kegiatan 17 Ags, Pengajian</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.tidakRutin.kegiatan > 0 ? formatRp(d.tidakRutin.kegiatan) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">5. Dana Sosial</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.tidakRutin.sosial > 0 ? formatRp(d.tidakRutin.sosial) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-100"><td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-sm">6. Gorol / Jasa Kebersihan</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.tidakRutin.gorong > 0 ? formatRp(d.tidakRutin.gorong) : '-'}</td>)}</tr>
                <tr className="border-b border-slate-200 bg-orange-50 font-semibold text-orange-700"><td className="sticky left-0 bg-orange-50 p-2 text-right pr-4 z-10 shadow-sm">Jumlah (IV)</td>{laporanData.map((d, i) => <td key={i} className="px-3 py-2 text-right">{d.totalTidakRutin > 0 ? formatRp(d.totalTidakRutin) : '-'}</td>)}</tr>
                <tr className="bg-slate-100 font-bold border-b border-slate-300"><td className="sticky left-0 bg-slate-100 p-3 z-10 shadow-sm uppercase">(V) (Defisit) / Surplus</td>{laporanData.map((d, i) => <td key={i} className={`px-3 py-3 text-right ${d.surplusDefisit < 0 ? 'text-red-600' : 'text-slate-700'}`}>{formatRp(d.surplusDefisit)}</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="pt-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">© 2026 Ivan Rahman - VILLA PERMATA MAS 1</p>
        </div>
      </div>
    );
  };

  const InfoView = () => {
    const [showAset, setShowAset] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [infoData, setInfoData] = useState({ title: '', desc: '', fileName: '' });
    const [showAsetForm, setShowAsetForm] = useState(false);
    const [assetForm, setAssetForm] = useState({ id: null, name: '', count: '' });
    const handleSaveInfo = (e) => { e.preventDefault(); const newAgenda = { id: Date.now(), title: infoData.title, desc: infoData.desc, fileName: infoData.fileName, date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }; const newAgendas = [newAgenda, ...agendas]; setAgendas(newAgendas); saveToDatabase('agendas', newAgendas); setShowForm(false); setInfoData({ title: '', desc: '', fileName: '' }); };
    const handleSaveAsset = (e) => { e.preventDefault(); let newAssets = []; if (assetForm.id) { newAssets = assets.map(a => a.id === assetForm.id ? { ...a, name: assetForm.name, count: assetForm.count } : a); } else { newAssets = [...assets, { id: Date.now(), name: assetForm.name, count: assetForm.count }]; } setAssets(newAssets); saveToDatabase('assets', newAssets); setShowAsetForm(false); setAssetForm({ id: null, name: '', count: '' }); };
    const handleDeleteAsset = (id) => { const newAssets = assets.filter(a => a.id !== id); setAssets(newAssets); saveToDatabase('assets', newAssets); };
    return (
      <div className="space-y-6 pb-12">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Informasi & Kegiatan</h2>
          {!showForm && userRole === 'PENGURUS' && (<button onClick={() => setShowForm(true)} className="w-full bg-blue-50 text-blue-600 border border-blue-200 p-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm mb-4"><PlusCircle className="w-5 h-5" /> Tulis Informasi Baru</button>)} 
          {showForm && userRole === 'PENGURUS' && (
            <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-sm mb-4 animate-in fade-in slide-in-from-top-2">
              <form onSubmit={handleSaveInfo} className="space-y-3">
                <input type="text" placeholder="Judul..." required value={infoData.title} onChange={(e) => setInfoData({...infoData, title: e.target.value})} className="w-full border border-slate-200 rounded-lg text-sm p-2 focus:ring-blue-500" />
                <textarea placeholder="Keterangan..." required rows="3" value={infoData.desc} onChange={(e) => setInfoData({...infoData, desc: e.target.value})} className="w-full border border-slate-200 rounded-lg text-sm p-2" />
                <div className="flex gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold">Batal</button> <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Posting</button></div>
              </form>
            </div>
          )}
          <div className="space-y-3">{agendas.map(agenda => (<div key={agenda.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2 relative"> {userRole === 'PENGURUS' && (<button onClick={() => { const newAgendas = agendas.filter(a => a.id !== agenda.id); setAgendas(newAgendas); saveToDatabase('agendas', newAgendas); }} className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>)} <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded w-fit">{agenda.date}</span> <h4 className="font-bold text-slate-800 pr-12">{agenda.title}</h4> <p className="text-xs text-slate-600">{agenda.desc}</p> </div>))}</div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1 mt-8">Inventaris Warga</h2>
          <button onClick={() => setShowAset(!showAset)} className="w-full bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between"> <div className="flex items-center gap-3"><div className="bg-green-100 p-2 rounded-lg"><Box className="w-5 h-5 text-green-600" /></div><span className="font-bold text-slate-700">Folder Aset Warga</span></div> {showAset ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />} </button>
          {showAset && (
            <div className="mt-3">
              {userRole === 'PENGURUS' && !showAsetForm && (<button onClick={() => setShowAsetForm(true)} className="w-full mb-3 bg-green-50 text-green-700 border border-green-200 p-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4" /> Tambah Aset</button>)}
              {userRole === 'PENGURUS' && showAsetForm && (
                <div className="bg-white border border-green-200 p-4 rounded-xl shadow-sm mb-3">
                  <form onSubmit={handleSaveAsset} className="space-y-3">
                    <input type="text" placeholder="Nama Barang..." required value={assetForm.name} onChange={(e) => setAssetForm({...assetForm, name: e.target.value})} className="w-full border rounded-lg text-sm p-2" />
                    <input type="text" placeholder="Jumlah..." required value={assetForm.count} onChange={(e) => setAssetForm({...assetForm, count: e.target.value})} className="w-full border rounded-lg text-sm p-2" />
                    <div className="flex gap-2"><button type="button" onClick={() => setShowAsetForm(false)} className="flex-1 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold">Batal</button> <button type="submit" className="flex-1 py-1.5 bg-green-600 text-white rounded-lg text-sm font-bold">Simpan</button></div>
                  </form>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3"> {assets.map((item) => (<div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center flex flex-col justify-center items-center relative"> {userRole === 'PENGURUS' && (<div className="absolute top-1 right-1 flex gap-1"><button onClick={() => { setAssetForm(item); setShowAsetForm(true); }} className="p-1 text-slate-300 hover:text-blue-500"><Edit3 className="w-3.5 h-3.5" /></button><button onClick={() => handleDeleteAsset(item.id)} className="p-1 text-slate-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button></div>)} <div className="font-bold text-slate-700 text-sm mt-2">{item.name}</div> <div className="text-xs text-green-600 font-bold mt-1 bg-green-50 px-2 py-0.5 rounded-full inline-block">{item.count}</div> </div>))} </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex justify-center">
      <div className="w-full max-w-md bg-slate-50 min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        {/* BACKGROUND LOGO BLUR */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
          <img src="/logo-bogor.png" alt="" className="w-[150%] max-w-none blur-sm" />
        </div>
        
        <div className="bg-white px-6 py-4 shadow-sm z-10 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo-bogor.png" alt="Logo Bogor" className="w-10 h-10 object-contain mr-3" onError={(e) => e.target.style.display='none'} />
            <div>
              <h1 className="text-xl font-extrabold text-green-700 tracking-tight">VILLA PERMATA MAS 1</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-widest">Sistem Kas RT 09/18</p>
            </div>
          </div>
          <div className="flex flex-col items-center ml-2 cursor-pointer" onClick={() => setUserRole('GUEST')} title="Logout">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 border border-green-200 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className={`text-[7px] mt-1 font-bold px-1.5 py-0.5 rounded-full border tracking-widest ${userRole === 'PENGURUS' ? 'bg-green-600 text-white border-green-700' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
              {userRole}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24 z-10">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'iuran' && <IuranView />}
          {activeTab === 'thr' && <ThrView />}
          {activeTab === 'kas' && <KasView />}
          {activeTab === 'laporan' && <LaporanView />}
          {activeTab === 'info' && <InfoView />}
          {activeTab === 'pengajian' && <PengajianView />}
        </div>

        {showQrisModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-xs relative flex flex-col items-center">
              <button onClick={() => setShowQrisModal(false)} className="absolute top-4 right-4 p-1.5 bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full transition z-10"><X className="w-5 h-5" /></button>
              <h3 className="font-extrabold text-blue-800 mb-1 mt-2 text-xl tracking-tight">QRIS MANDIRI</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">A.N. IVAN RAHMAN</p>
              <div className="w-64 h-64 bg-blue-50 border-2 border-blue-200 rounded-2xl flex items-center justify-center p-2 mb-6 shadow-inner relative overflow-hidden">
                 <img src="/qris.jpeg" alt="QRIS Scan" className="w-full h-full object-contain rounded-xl mix-blend-multiply" onError={(e) => e.target.src='https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=1170011106804'} />
                 <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-lg animate-[scan_2s_linear_infinite]"></div>
              </div>
              <p className="text-[11px] text-center text-slate-500 px-4">Scan kode QR di atas untuk pembayaran via m-banking atau e-wallet.</p>
            </div>
          </div>
        )}
        <style>{`@keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-3 flex justify-between items-center z-20">
          <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'dashboard' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}><LayoutDashboard className="w-5 h-5" /><span className="text-[9px] font-medium">Beranda</span></button>
          <button onClick={() => setActiveTab('iuran')} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'iuran' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}><Users className="w-5 h-5" /><span className="text-[9px] font-medium">Iuran</span></button>
          <button onClick={() => setActiveTab('kas')} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'kas' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}><Wallet className="w-5 h-5" /><span className="text-[9px] font-medium">Transaksi</span></button>
          <button onClick={() => setActiveTab('laporan')} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'laporan' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}><FileSpreadsheet className="w-5 h-5" /><span className="text-[9px] font-medium">Laporan</span></button>
          <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'info' ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'}`}><Info className="w-5 h-5" /><span className="text-[9px] font-medium">Info</span></button>
        </div>
      </div>
    </div>
  );
}