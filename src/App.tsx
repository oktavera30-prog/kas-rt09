import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Wallet,
  FileSpreadsheet,
  LayoutDashboard,
  PlusCircle,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Trash2,
  Save,
  Search,
  Info,
  Gift,
  Box,
  Calendar,
  Wrench,
  QrCode,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Copy,
  X,
  UploadCloud,
  Image as ImageIcon,
  FileText,
  Lock,
  Loader2,
  BookOpen,
  Edit3,
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';

// --- INIT FIREBASE (Sesuai Data Kunci Bapak) ---
const firebaseConfig = {
  apiKey: 'AIzaSyAMm1dv7i1F0IuE3047jlwv-bpY6dYqzkU',
  authDomain: 'kas-rt-09.firebaseapp.com',
  projectId: 'kas-rt-09',
  storageBucket: 'kas-rt-09.firebasestorage.app',
  messagingSenderId: '372449716949',
  appId: '1:372449716949:web:fc5b8ce52e57789ceb505c',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'kas-rt-09-main';

// --- DATA AWAL WARGA ---
const INITIAL_RESIDENTS = [
  {
    id: 1,
    name: 'BPK. KHAIDIR',
    block: 'CA12',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000, 1: 62000 }, 2026: {} },
  },
  {
    id: 2,
    name: 'BPK. BUDI',
    block: 'CA13',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 3,
    name: 'BPK. SINGGIH',
    block: 'CA16',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000, 1: 62000 }, 2026: {} },
  },
  {
    id: 4,
    name: 'BPK. KUSNADI',
    block: 'CA15',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000, 1: 63000 }, 2026: {} },
  },
  {
    id: 5,
    name: 'BPK. A. DONI',
    block: 'CA17',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 6,
    name: 'BPK. FATUR',
    block: 'CA18',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 7,
    name: 'BPK. YUDI',
    block: 'CA19',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 8,
    name: 'BPK. FADLI',
    block: 'CA20',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 9,
    name: 'BPK. MATSANI',
    block: 'CA21',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: {}, 2026: {} },
  },
  {
    id: 10,
    name: 'BPK. DADANG',
    block: 'CA22',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 11,
    name: 'BPK. ALFONSUS',
    block: 'CB2',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 12,
    name: 'BPK. ZULKARNAEN',
    block: 'CB3',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 13,
    name: 'BPK. SITUMARANG',
    block: 'CB3A',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 14,
    name: 'BPK. IQBAL',
    block: 'CB5',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 15,
    name: 'BPK. IVAN',
    block: 'CB6',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 16,
    name: 'BPK. SEPEK',
    block: 'CB7',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 17,
    name: 'BPK. PENDI',
    block: 'CB8',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 18,
    name: 'BPK. JOKO',
    block: 'CB9',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 19,
    name: 'BPK. YANSURI',
    block: 'CB10',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 20,
    name: 'BPK. IWAN',
    block: 'CB11',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 21,
    name: 'BPK. GIRO',
    block: 'CB01',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 22,
    name: 'BPK. HILMAN',
    block: 'CA14',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 23,
    name: 'IBU DEDE SUYETI',
    block: 'CB12',
    defaultAmount: 72000,
    payments: { 2024: {}, 2025: { 0: 72000 }, 2026: {} },
  },
  {
    id: 24,
    name: 'BPK. ERVAN',
    block: 'CB15',
    defaultAmount: 74000,
    payments: { 2024: {}, 2025: { 0: 74000 }, 2026: {} },
  },
  {
    id: 25,
    name: 'IBU MELI',
    block: 'CB14',
    defaultAmount: 70000,
    payments: { 2024: {}, 2025: { 0: 70000 }, 2026: {} },
  },
  {
    id: 26,
    name: 'BPK. HERI',
    block: 'CB16',
    defaultAmount: 100000,
    payments: { 2024: {}, 2025: { 0: 100000 }, 2026: {} },
  },
  {
    id: 27,
    name: 'BPK. MULYADI',
    block: 'CB17',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 28,
    name: 'BPK. DWI',
    block: 'CB19A',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 29,
    name: 'BPK. TRI',
    block: 'CB18',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 30,
    name: 'BPK. NUNUNG',
    block: 'CB20',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 31,
    name: 'BPK. JOKO',
    block: 'CB19B',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 32,
    name: 'BPK. IWAN',
    block: 'CB21',
    defaultAmount: 60000,
    payments: { 2024: {}, 2025: { 0: 60000 }, 2026: {} },
  },
  {
    id: 33,
    name: 'BPK. HARIYANTO',
    block: 'CC1',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 34,
    name: 'BPK. AGUS H',
    block: 'CC2',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 35,
    name: 'BPK. IWAN D',
    block: 'CC3',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 36,
    name: 'BPK. ARIS',
    block: 'CC8',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 37,
    name: 'BPK. AGUS CIK',
    block: 'CC8A',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 38,
    name: 'BPK. TEGUH',
    block: 'CC9',
    defaultAmount: 60000,
    payments: { 2024: {}, 2025: { 0: 60000 }, 2026: {} },
  },
  {
    id: 39,
    name: 'BPK. ENDI',
    block: 'CC12',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 40,
    name: 'BPK. ASEP',
    block: 'CC14',
    defaultAmount: 60000,
    payments: { 2024: {}, 2025: { 0: 60000 }, 2026: {} },
  },
  {
    id: 41,
    name: 'BPK. PRIYO',
    block: 'CC16',
    defaultAmount: 66000,
    payments: { 2024: {}, 2025: { 0: 66000 }, 2026: {} },
  },
  {
    id: 42,
    name: 'BPK. CHARLES',
    block: 'CC16A',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 43,
    name: 'BPK. TOMSON',
    block: 'CC16B',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 44,
    name: 'BPK. ROMA',
    block: 'CC16C',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 45,
    name: 'BPK. DIKY',
    block: 'CC17',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 46,
    name: 'BPK. RAFAEL',
    block: 'CD1',
    defaultAmount: 59000,
    payments: { 2024: {}, 2025: { 0: 59000 }, 2026: {} },
  },
  {
    id: 47,
    name: 'BPK. RUSTAM',
    block: 'CD2',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 48,
    name: 'BPK. EKKI',
    block: 'CD3A',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 49,
    name: 'BPK. HORI',
    block: 'CD6',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 50,
    name: 'BPK. ALBAR',
    block: 'CD6',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 51,
    name: 'BPK. ESMANSYAH',
    block: 'CD7',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 52,
    name: 'BPK. FERI',
    block: 'CD8',
    defaultAmount: 63000,
    payments: { 2024: {}, 2025: { 0: 63000 }, 2026: {} },
  },
  {
    id: 53,
    name: 'BPK. AJID',
    block: 'CD9',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 54,
    name: 'BPK. WAHYUDI',
    block: 'CD10',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 55,
    name: 'BPK. HENDRIK',
    block: 'CD12',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 56,
    name: 'BPK. WARSITO',
    block: 'CD12A',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 57,
    name: 'BPK. RIZAL',
    block: 'CD14',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 'LUNAS' }, 2026: {} },
  },
  {
    id: 58,
    name: 'IBU DISTIRA',
    block: 'CE3',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 59,
    name: 'BPK. ASYID',
    block: 'CE3A',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 60,
    name: 'BPK. FAISAL',
    block: 'CE5',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 61,
    name: 'BPK. YOSA',
    block: 'CE8',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
  {
    id: 62,
    name: 'BPK. DERI',
    block: 'CE2',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 63,
    name: 'BPK. AMIR',
    block: 'CE1',
    defaultAmount: 61000,
    payments: { 2024: {}, 2025: { 0: 61000 }, 2026: {} },
  },
  {
    id: 64,
    name: 'BPK. ARIF',
    block: 'CD15',
    defaultAmount: 62000,
    payments: { 2024: {}, 2025: { 0: 62000 }, 2026: {} },
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: 101,
    date: '12 Jan 2025',
    month: 0,
    year: 2025,
    type: 'out',
    category: 'Gaji Petugas Keamanan',
    amount: 1180000,
    description: 'Gaji Januari',
  },
  {
    id: 102,
    date: '12 Jan 2025',
    month: 0,
    year: 2025,
    type: 'out',
    category: 'Gaji Petugas Kebersihan',
    amount: 1080000,
    description: 'Gaji Januari',
  },
  {
    id: 103,
    date: '15 Jan 2025',
    month: 0,
    year: 2025,
    type: 'out',
    category: 'Kas RW',
    amount: 59000,
    description: 'Setoran RW Jan',
  },
  {
    id: 104,
    date: '15 Jan 2025',
    month: 0,
    year: 2025,
    type: 'out',
    category: 'Iuran Posyandu',
    amount: 59000,
    description: 'Setoran Posyandu Jan',
  },
  {
    id: 105,
    date: '15 Jan 2025',
    month: 0,
    year: 2025,
    type: 'out',
    category: 'LSK',
    amount: 234000,
    description: 'Setoran LSK Jan',
  },
  {
    id: 106,
    date: '20 Jan 2025',
    month: 0,
    year: 2025,
    type: 'out',
    category: 'Perbaikan/Perawatan',
    amount: 245000,
    description: 'Perbaikan gapura',
  },
  {
    id: 107,
    date: '25 Jan 2025',
    month: 0,
    year: 2025,
    type: 'out',
    category: 'Kegiatan 17 Agustus, Pengajian, dll',
    amount: 250000,
    description: 'Pengajian rutin',
  },
  {
    id: 108,
    date: '28 Jan 2025',
    month: 0,
    year: 2025,
    type: 'in',
    category: 'Dana Program Inventaris RT',
    amount: 1000000,
    description: 'Sumbangan',
  },
];

const INITIAL_ASSETS = [
  { id: 1, name: 'Kursi', count: '120 Unit' },
  { id: 2, name: 'Tenda 4x6', count: '2 Unit' },
  { id: 3, name: 'Sound System', count: '1 Set' },
  { id: 4, name: 'Kipas Angin', count: '1 Unit' },
  { id: 5, name: 'Piring', count: '1 Perangkat' },
  { id: 6, name: 'Alat Gorol', count: 'Tersedia' },
  { id: 7, name: 'Mesin Rumput', count: '1 Unit' },
];

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const YEARS = [2024, 2025, 2026];

export default function App() {
  const [user, setUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  const [userRole, setUserRole] = useState('GUEST');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentMonthIdx, setCurrentMonthIdx] = useState(new Date().getMonth());
  const [saldoAwalTahun] = useState(1168500);

  // --- STATE DATABASE ---
  const [residents, setResidents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [assets, setAssets] = useState([]);
  const [pengajianData, setPengajianData] = useState({
    saldo: 0,
    waktu: 'Belum diatur',
  });

  const [showQrisModal, setShowQrisModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Inisialisasi Auth Firebase
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error('Auth error:', err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Fetch Data Firestore
  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, 'vpm1', appId);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setDoc(docRef, {
            residents: INITIAL_RESIDENTS,
            transactions: INITIAL_TRANSACTIONS,
            agendas: [],
            assets: INITIAL_ASSETS,
            pengajianData: {
              saldo: 0,
              waktu: 'Setiap Malam Jumat, Pukul 19.30 WIB',
            },
          });
        } else {
          const data = snapshot.data();
          if (data.residents) setResidents(data.residents);
          if (data.transactions) setTransactions(data.transactions);
          if (data.agendas) setAgendas(data.agendas);
          if (data.assets) setAssets(data.assets);
          else setAssets(INITIAL_ASSETS);
          if (data.pengajianData) setPengajianData(data.pengajianData);
        }
        setDbLoading(false);
      },
      (err) => {
        console.error('Gagal mengambil data:', err);
        setDbLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  const saveToDatabase = async (key, dataToSave) => {
    if (!user || userRole !== 'PENGURUS') return;
    try {
      const docRef = doc(db, 'vpm1', appId);
      await setDoc(docRef, { [key]: dataToSave }, { merge: true });
    } catch (err) {
      console.error('Gagal simpan:', err);
    }
  };

  const formatRp = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  if (dbLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-green-700">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <h2 className="font-bold">Menghubungkan ke Database...</h2>
      </div>
    );
  }

  // --- REVISI 7: HALAMAN LOGIN DENGAN LOGO & ALAMAT LENGKAP ---
  if (userRole === 'GUEST') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans flex justify-center">
        <div className="w-full max-w-md bg-slate-50 min-h-screen relative shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6">
          {/* Logo Kabupaten Bogor dipanggil dari folder public */}
          <img
            src="/logo-bogor.png"
            alt="Logo Kab Bogor"
            className="w-16 h-16 object-contain mb-3 drop-shadow-sm"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />

          <h1 className="text-2xl font-extrabold text-green-700 tracking-tight mb-1 text-center">
            VILLA PERMATA MAS 1
          </h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
            Sistem Kas RT 09/18
          </p>
          <p className="text-[9px] font-bold text-slate-400 text-center mt-2 px-6 mb-8 leading-relaxed tracking-wide">
            VILLA PERMATA MAS RAYA, BOJONG NANGKA, KEC. GN. PUTRI, KABUPATEN
            BOGOR, JAWA BARAT 16963
          </p>

          <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4 z-10">
            <h2 className="text-sm font-bold text-slate-700 mb-4 text-center">
              Pilih Mode Akses:
            </h2>
            <button
              onClick={() => setUserRole('WARGA')}
              className="w-full py-3.5 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 hover:bg-blue-100 transition flex items-center justify-center gap-3 shadow-sm"
            >
              <Users className="w-5 h-5" /> Masuk Sebagai Warga (Hanya Lihat)
            </button>
            <button
              onClick={() => setShowPinModal(true)}
              className="w-full py-3.5 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 hover:bg-green-100 transition flex items-center justify-center gap-3 shadow-sm"
            >
              <Lock className="w-5 h-5" /> Masuk Sebagai Pengurus (Kelola)
            </button>
          </div>

          {showPinModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-xs relative animate-in fade-in zoom-in duration-200">
                <button
                  onClick={() => {
                    setShowPinModal(false);
                    setPin('');
                    setPinError(false);
                  }}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-slate-800 mb-4 text-center">
                  PIN Pengurus
                </h3>
                <input
                  type="password"
                  maxLength={6}
                  autoFocus
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="******"
                  className={`w-full text-center text-2xl tracking-[0.5em] font-bold p-3 border rounded-xl focus:ring-green-500 focus:border-green-500 mb-2 ${
                    pinError
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-slate-300'
                  }`}
                />
                {pinError && (
                  <p className="text-xs text-red-500 text-center font-semibold mb-3">
                    PIN Salah! Coba lagi.
                  </p>
                )}
                <button
                  onClick={() => {
                    if (pin === '123456') {
                      setUserRole('PENGURUS');
                      setShowPinModal(false);
                      setPinError(false);
                    } else {
                      setPinError(true);
                    }
                  }}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 mt-2 shadow-md"
                >
                  Lanjutkan
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-3">
                  *Gunakan PIN: 123456
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- REVISI 5: PENGAJIAN VIEW ---
  const PengajianView = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editSaldo, setEditSaldo] = useState(pengajianData.saldo);
    const [editWaktu, setEditWaktu] = useState(pengajianData.waktu);

    const handleSavePengajian = () => {
      const newData = { saldo: Number(editSaldo), waktu: editWaktu };
      setPengajianData(newData);
      saveToDatabase('pengajianData', newData);
      setIsEditing(false);
    };

    return (
      <div className="space-y-4 animate-in fade-in">
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Saldo Pengajian RT09
        </h2>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-100 opacity-50" />
          <p className="text-sm font-bold text-emerald-800 mb-1">
            Total Kas Pengajian
          </p>
          <h3 className="text-3xl font-extrabold text-emerald-700 mb-4 relative z-10">
            {formatRp(pengajianData.saldo)}
          </h3>

          <div className="bg-white/60 p-3 rounded-xl border border-emerald-100 relative z-10">
            <p className="text-[10px] text-emerald-600 font-bold uppercase mb-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Info Waktu Pengajian:
            </p>
            <p className="text-xs font-semibold text-slate-800">
              {pengajianData.waktu}
            </p>
          </div>
        </div>

        {userRole === 'PENGURUS' && !isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              setEditSaldo(pengajianData.saldo);
              setEditWaktu(pengajianData.waktu);
            }}
            className="w-full bg-slate-800 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700 shadow-sm"
          >
            <Edit3 className="w-4 h-4" /> Edit Data Pengajian
          </button>
        )}

        {isEditing && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Update Saldo Kas (Rp)
              </label>
              <input
                type="number"
                value={editSaldo}
                onChange={(e) => setEditSaldo(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Update Jadwal Pengajian
              </label>
              <input
                type="text"
                value={editWaktu}
                onChange={(e) => setEditWaktu(e.target.value)}
                className="w-full p-2.5 border rounded-lg text-sm bg-slate-50 focus:ring-emerald-500"
                placeholder="Cth: Malam Jumat..."
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleSavePengajian}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const DashboardView = () => {
    // Logic kalkulasi dashboard untuk tahun 2025 sbg default
    let totalPenerimaanDashboard = 0;
    let totalPengeluaranDashboard = 0;

    // Hitung iuran bulan berjalan (2025)
    residents.forEach((res) => {
      const pay = res.payments[2025]
        ? res.payments[2025][currentMonthIdx]
        : undefined;
      if (pay === 'LUNAS') totalPenerimaanDashboard += res.defaultAmount;
      else if (typeof pay === 'number') totalPenerimaanDashboard += pay;
    });

    const transBulanIni = transactions.filter(
      (t) => t.month === currentMonthIdx && t.year === 2025
    );
    totalPenerimaanDashboard += transBulanIni
      .filter((t) => t.type === 'in')
      .reduce((s, t) => s + t.amount, 0);
    totalPengeluaranDashboard += transBulanIni
      .filter((t) => t.type === 'out')
      .reduce((s, t) => s + t.amount, 0);

    // Hitung saldo riil = Saldo Awal + Semua Pemasukan (Tahun brp pun) - Semua Pengeluaran
    let saldoRiil = saldoAwalTahun;
    transactions.forEach((t) => {
      if (t.type === 'in') saldoRiil += t.amount;
      if (t.type === 'out') saldoRiil -= t.amount;
    });
    residents.forEach((r) => {
      YEARS.forEach((y) => {
        for (let i = 0; i < 12; i++) {
          const p = r.payments[y] ? r.payments[y][i] : undefined;
          if (p === 'LUNAS') saldoRiil += r.defaultAmount;
          else if (typeof p === 'number') saldoRiil += p;
        }
      });
    });

    const handleCopy = () => {
      const textField = document.createElement('textarea');
      textField.innerText = '1170011106804';
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          {userRole === 'WARGA' && (
            <div className="absolute top-0 right-0 bg-white/20 text-[10px] px-3 py-1 rounded-bl-xl font-bold">
              MODE: HANYA LIHAT
            </div>
          )}
          <h2 className="text-sm font-medium text-green-100 mb-1">
            Saldo Akhir Kas RT
          </h2>
          <div className="text-3xl font-bold mb-4">{formatRp(saldoRiil)}</div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/20 pt-4">
            <div>
              <div className="flex items-center text-green-100 text-xs mb-1">
                <ArrowUpRight className="w-4 h-4 mr-1" /> Pemasukan Bln Ini
              </div>
              <div className="font-semibold">
                {formatRp(totalPenerimaanDashboard)}
              </div>
            </div>
            <div>
              <div className="flex items-center text-red-200 text-xs mb-1">
                <ArrowDownRight className="w-4 h-4 mr-1" /> Pengeluaran Bln Ini
              </div>
              <div className="font-semibold">
                {formatRp(totalPengeluaranDashboard)}
              </div>
            </div>
          </div>
        </div>

        {/* --- REVISI 5 & 6: 4 Folder Beranda (Pengajian, PENGELUARAN, IURAN THR) --- */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab('iuran')}
            className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 hover:bg-slate-50 transition"
          >
            <div className="bg-blue-100 p-2.5 rounded-full text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">IURAN</span>
          </button>
          <button
            onClick={() => setActiveTab('kas')}
            className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 hover:bg-slate-50 transition"
          >
            <div className="bg-orange-100 p-2.5 rounded-full text-orange-600">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              PENGELUARAN
            </span>
          </button>
          <button
            onClick={() => setActiveTab('thr')}
            className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 hover:bg-slate-50 transition"
          >
            <div className="bg-yellow-100 p-2.5 rounded-full text-yellow-600">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700">IURAN THR</span>
          </button>
          <button
            onClick={() => setActiveTab('pengajian')}
            className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3 hover:bg-slate-50 transition"
          >
            <div className="bg-emerald-100 p-2.5 rounded-full text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700 text-left leading-tight">
              SALDO PENGAJIAN RT09
            </span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-600" /> Info Rekening &
            Pembayaran
          </h3>
          <div className="flex items-center gap-4">
            <div
              onClick={() => setShowQrisModal(true)}
              className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shrink-0 cursor-pointer hover:bg-slate-200 transition relative group shadow-sm overflow-hidden"
              title="Perbesar QRIS"
            >
              {/* REVISI 4: Panggilan File QRIS Asli */}
              <img
                src="/qris.jpeg"
                alt="QRIS"
                className="w-full h-full object-cover p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div
                style={{ display: 'none' }}
                className="text-[8px] font-bold text-center text-slate-400"
              >
                QRIS ASLI
              </div>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Search className="w-5 h-5 text-slate-700 bg-white rounded-full p-1 shadow-sm" />
              </div>
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-[11px] text-slate-500 font-medium">
                Bank Mandiri
              </p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-800 tracking-wider text-sm">
                  1170011106804
                </p>
                <button
                  onClick={handleCopy}
                  className={`p-1.5 rounded-md transition ${
                    copied
                      ? 'bg-green-100 text-green-600'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-600 font-bold uppercase mt-0.5">
                A.N. IVAN RAHMAN
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const IuranView = () => {
    const [search, setSearch] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const togglePaymentGrid = (residentId, m) => {
      if (userRole !== 'PENGURUS') return;
      const newResidents = residents.map((r) => {
        if (r.id === residentId) {
          const newPayments = { ...r.payments };
          if (!newPayments[selectedYear]) newPayments[selectedYear] = {};
          if (Object.values(newPayments[selectedYear]).includes('LUNAS')) {
            for (let i = 0; i < 12; i++)
              newPayments[selectedYear][i] = r.defaultAmount;
          }
          if (newPayments[selectedYear][m]) delete newPayments[selectedYear][m];
          else newPayments[selectedYear][m] = r.defaultAmount;
          return { ...r, payments: newPayments };
        }
        return r;
      });
      setResidents(newResidents);
      saveToDatabase('residents', newResidents);
    };

    const filteredWarga = residents.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.block.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="h-[75vh] flex flex-col space-y-3">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Pencatatan Iuran
            </h2>
            <p className="text-xs text-slate-500">Pilih tahun riwayat.</p>
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg block p-2 shadow-sm"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                Tahun {y}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 shrink-0">
          <h3 className="text-xs font-bold text-blue-800 mb-2 flex items-center gap-1">
            <Info className="w-4 h-4" /> Rincian Iuran Bulanan (Pokok: Rp
            58.000)
          </h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-blue-700">
            <p>a. Uang Sampah: Rp20.000</p>
            <p>b. Uang Keamanan: Rp20.000</p>
            <p>c. Kas RW: Rp1.000</p>
            <p>d. Kas RT: Rp13.000</p>
            <p>e. Uang Sosial: Rp3.000</p>
            <p>f. Posyandu: Rp1.000</p>
          </div>
          <p className="text-[9px] text-blue-600 mt-2 italic">
            *Belum termasuk LSK Rp1.000/Jiwa
          </p>
        </div>

        <div className="relative shrink-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-slate-200 text-slate-900 text-sm rounded-xl block w-full pl-10 p-3"
            placeholder="Cari nama warga atau blok..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative">
          <div className="overflow-auto flex-1">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="sticky top-0 left-0 bg-slate-100 p-3 z-30 shadow-[2px_2px_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap">
                    Nama Warga
                  </th>
                  {MONTHS.map((m, i) => (
                    <th
                      key={i}
                      className="sticky top-0 bg-slate-50 p-3 text-center min-w-[50px] font-semibold z-20 shadow-[0_2px_5px_-2px_rgba(0,0,0,0.1)]"
                    >
                      {m.slice(0, 3)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWarga.map((warga) => (
                  <tr key={warga.id} className="hover:bg-slate-50 transition">
                    <td className="sticky left-0 bg-white p-3 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] flex flex-col whitespace-nowrap">
                      <span className="font-semibold text-slate-800">
                        {warga.name}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {warga.block} • {formatRp(warga.defaultAmount)}
                      </span>
                    </td>
                    {MONTHS.map((m, i) => {
                      const paymentsYear = warga.payments[selectedYear] || {};
                      const isPaid =
                        paymentsYear[i] ||
                        Object.values(paymentsYear).includes('LUNAS');
                      return (
                        <td
                          key={i}
                          className={`p-2 text-center border-l border-slate-50 ${
                            userRole === 'PENGURUS'
                              ? 'cursor-pointer hover:bg-slate-100'
                              : 'cursor-default'
                          }`}
                          onClick={() => togglePaymentGrid(warga.id, i)}
                        >
                          <div className="flex justify-center items-center h-full">
                            {isPaid ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100" />
                            ) : (
                              <Circle className="w-6 h-6 text-slate-200 hover:text-green-300" />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-green-50 font-semibold relative z-20">
                <tr>
                  <td className="sticky bottom-0 left-0 bg-green-100 p-3 z-30 shadow-[2px_-2px_5px_-2px_rgba(0,0,0,0.1)] text-green-800 text-[11px] whitespace-nowrap">
                    Total Terkumpul
                  </td>
                  {MONTHS.map((_, i) => {
                    const totalMth = filteredWarga.reduce((sum, r) => {
                      const paymentsYear = r.payments[selectedYear] || {};
                      const isLunas =
                        Object.values(paymentsYear).includes('LUNAS');
                      return (
                        sum + (isLunas ? r.defaultAmount : paymentsYear[i] || 0)
                      );
                    }, 0);
                    return (
                      <td
                        key={i}
                        className="sticky bottom-0 z-20 bg-green-50 p-2 text-center border-l border-green-100 text-[10px] text-green-700 whitespace-nowrap shadow-[0_-2px_5px_-2px_rgba(0,0,0,0.1)]"
                      >
                        {totalMth > 0
                          ? (totalMth / 1000).toLocaleString('id-ID') + 'K'
                          : '-'}
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
    const [search, setSearch] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const toggleThrPayment = (residentId) => {
      if (userRole !== 'PENGURUS') return;
      const newResidents = residents.map((r) => {
        if (r.id === residentId) {
          const currentThr = r.thrPayments || {};
          return {
            ...r,
            thrPayments: {
              ...currentThr,
              [selectedYear]: !currentThr[selectedYear],
            },
          };
        }
        return r;
      });
      setResidents(newResidents);
      saveToDatabase('residents', newResidents);
    };

    const filteredWarga = residents.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.block.toLowerCase().includes(search.toLowerCase())
    );
    const thrNominal = 50000;
    const totalTerkumpul = filteredWarga.reduce(
      (sum, r) => sum + (r.thrPayments?.[selectedYear] ? thrNominal : 0),
      0
    );

    return (
      <div className="h-[75vh] flex flex-col space-y-3">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-yellow-800">
              Pencatatan Iuran THR
            </h2>
            <p className="text-xs text-yellow-600">Rp 50.000 / Warga</p>
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm font-semibold rounded-lg block p-2 shadow-sm"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                Tahun {y}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200 flex justify-between items-center shrink-0">
          <span className="text-sm font-bold text-yellow-800">
            Total Terkumpul:
          </span>
          <span className="text-lg font-extrabold text-yellow-700">
            {formatRp(totalTerkumpul)}
          </span>
        </div>
        <div className="relative shrink-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-slate-200 text-slate-900 text-sm rounded-xl block w-full pl-10 p-3"
            placeholder="Cari nama warga atau blok..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
          <div className="overflow-auto flex-1">
            <div className="divide-y divide-slate-100">
              {filteredWarga.map((warga) => {
                const isPaid = warga.thrPayments?.[selectedYear];
                return (
                  <div
                    key={warga.id}
                    className={`p-4 flex items-center justify-between transition ${
                      isPaid ? 'bg-yellow-50/30' : 'hover:bg-slate-50'
                    } ${
                      userRole === 'PENGURUS'
                        ? 'cursor-pointer'
                        : 'cursor-default'
                    }`}
                    onClick={() => toggleThrPayment(warga.id)}
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">
                        {warga.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Blok: {warga.block}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isPaid ? (
                        <span className="text-[10px] font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                          LUNAS
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                          BELUM
                        </span>
                      )}
                      <div>
                        {isPaid ? (
                          <CheckCircle2 className="w-7 h-7 text-yellow-500 fill-yellow-100" />
                        ) : (
                          <Circle className="w-7 h-7 text-slate-300" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KasView = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMth, setSelectedMth] = useState(currentMonthIdx);
    const [showForm, setShowForm] = useState(false);
    const [tType, setTType] = useState('out');
    const [tCategory, setTCategory] = useState('Gaji Petugas Keamanan');
    const [tAmount, setTAmount] = useState('');
    const [tDesc, setTDesc] = useState('');

    const currentTrans = transactions.filter(
      (t) => t.month === selectedMth && t.year === selectedYear
    );

    const handleSave = (e) => {
      e.preventDefault();
      const newT = {
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        month: selectedMth,
        year: selectedYear,
        type: tType,
        category: tCategory,
        amount: Number(tAmount),
        description: tDesc,
      };
      const newTransactions = [...transactions, newT];
      setTransactions(newTransactions);
      saveToDatabase('transactions', newTransactions);
      setShowForm(false);
      setTAmount('');
      setTDesc('');
    };

    const deleteTrans = (id) => {
      if (userRole !== 'PENGURUS') return;
      const newTransactions = transactions.filter((t) => t.id !== id);
      setTransactions(newTransactions);
      saveToDatabase('transactions', newTransactions);
    };

    const categoriesOut = [
      'Gaji Petugas Keamanan',
      'Gaji Petugas Kebersihan',
      'Kas RW',
      'Iuran Posyandu',
      'LSK',
      'Admin BANK',
      'THR',
      'Perbaikan/Perawatan',
      'Biaya Rapat/Pertemuan',
      'Kegiatan 17 Agustus, Pengajian, dll',
      'Dana Sosial',
      'Gorol /jasa kebersihan',
    ];

    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">
          Buku Kas Operasional
        </h2>
        <div className="flex items-center gap-2 mb-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg block p-2 flex-1 shadow-sm"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                Tahun {y}
              </option>
            ))}
          </select>
          <select
            value={selectedMth}
            onChange={(e) => setSelectedMth(Number(e.target.value))}
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg block p-2 flex-1 shadow-sm"
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {!showForm && userRole === 'PENGURUS' && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-slate-800 text-white p-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-700 shadow-sm"
          >
            <PlusCircle className="w-5 h-5" /> Catat Transaksi Baru
          </button>
        )}

        {showForm && userRole === 'PENGURUS' && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-2">
            <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">
              Transaksi Baru
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTType('out')}
                  className={`py-2 text-sm font-medium rounded-lg border ${
                    tType === 'out'
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  Pengeluaran
                </button>
                <button
                  type="button"
                  onClick={() => setTType('in')}
                  className={`py-2 text-sm font-medium rounded-lg border ${
                    tType === 'in'
                      ? 'bg-green-50 border-green-200 text-green-600'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  Pemasukan Lain
                </button>
              </div>
              {tType === 'out' && (
                <select
                  value={tCategory}
                  onChange={(e) => setTCategory(e.target.value)}
                  className="w-full border-slate-200 rounded-lg text-sm p-3 bg-slate-50"
                >
                  {categoriesOut.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
              {tType === 'in' && (
                <input
                  type="text"
                  value={tCategory}
                  onChange={(e) => setTCategory(e.target.value)}
                  placeholder="Kategori Pemasukan"
                  className="w-full border border-slate-200 rounded-lg text-sm p-3"
                  required
                />
              )}
              <input
                type="number"
                placeholder="Nominal (Rp)"
                value={tAmount}
                onChange={(e) => setTAmount(e.target.value)}
                className="w-full border border-slate-200 rounded-lg text-sm p-3"
                required
              />
              <input
                type="text"
                placeholder="Keterangan Lengkap (Opsional)"
                value={tDesc}
                onChange={(e) => setTDesc(e.target.value)}
                className="w-full border border-slate-200 rounded-lg text-sm p-3"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-4 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Riwayat: {MONTHS[selectedMth]} {selectedYear}
          </div>
          <div className="divide-y divide-slate-100">
            {currentTrans.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                Belum ada transaksi bulan ini.
              </div>
            ) : (
              currentTrans.map((t) => (
                <div
                  key={t.id}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {t.type === 'in' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-semibold text-sm text-slate-800">
                        {t.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 ml-6 text-xs">
                      <span className="font-medium text-slate-500">
                        {t.date || '-'}
                      </span>
                      {t.description && (
                        <span className="text-slate-400">
                          • {t.description}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <span
                      className={`font-bold text-sm ${
                        t.type === 'in' ? 'text-green-600' : 'text-slate-800'
                      }`}
                    >
                      {t.type === 'out' ? '-' : '+'}
                      {formatRp(t.amount)}
                    </span>
                    {userRole === 'PENGURUS' && (
                      <button
                        onClick={() => deleteTrans(t.id)}
                        className="text-slate-300 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // --- REVISI 3: LAPORAN 3 TAHUN KEBELAKANG ---
  const LaporanView = () => {
    const [selectedYearLap, setSelectedYearLap] = useState(
      new Date().getFullYear()
    );

    // Kalkulasi Data Laporan sesuai Tahun Terpilih
    const laporanTahunIni = useMemo(() => {
      let laporan = [];
      // Cari saldo awal tahun yang tepat.
      // Untuk sederhananya: jika tahun < 2025 (asumsi app start), saldo dihitung 0 atau dari riwayat sebelumnya.
      // Tapi kita gunakan saldo awal konstan jika 2025, dan akumulasi dari awal jika tahun lain (logika sederhana)
      let saldoBulanSebelumnya = selectedYearLap === 2025 ? saldoAwalTahun : 0;

      // Jika butuh saldo akurat tiap tahun, kita ambil semua transaksi sblm tahun tsb
      let akumulasiSblm = 0;
      if (selectedYearLap > 2024) {
        akumulasiSblm = saldoAwalTahun; // base 2025
        transactions.forEach((t) => {
          if (t.year < selectedYearLap && t.year >= 2025) {
            if (t.type === 'in') akumulasiSblm += t.amount;
            else akumulasiSblm -= t.amount;
          }
        });
        residents.forEach((r) => {
          for (let y = 2025; y < selectedYearLap; y++) {
            for (let i = 0; i < 12; i++) {
              const p = r.payments[y]?.[i];
              if (p === 'LUNAS') akumulasiSblm += r.defaultAmount;
              else if (p) akumulasiSblm += p;
            }
          }
        });
        saldoBulanSebelumnya = akumulasiSblm;
      }

      for (let m = 0; m < 12; m++) {
        let totalIuranBulanIni = 0;
        residents.forEach((res) => {
          const pay = res.payments[selectedYearLap]
            ? res.payments[selectedYearLap][m]
            : undefined;
          if (pay === 'LUNAS') totalIuranBulanIni += res.defaultAmount * 12;
          else if (typeof pay === 'number') totalIuranBulanIni += pay;
        });

        const transBulanIni = transactions.filter(
          (t) => t.month === m && t.year === selectedYearLap
        );
        const penerimaanLain = transBulanIni
          .filter((t) => t.type === 'in')
          .reduce((sum, t) => sum + t.amount, 0);
        const totalPenerimaan = totalIuranBulanIni + penerimaanLain;

        const filterPengeluaran = (kategori) =>
          transBulanIni
            .filter((t) => t.type === 'out' && t.category === kategori)
            .reduce((sum, t) => sum + t.amount, 0);

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
        const totalTidakRutin = Object.values(tidakRutin).reduce(
          (a, b) => a + b,
          0
        );

        const surplusDefisit = totalPenerimaan - totalRutin - totalTidakRutin;
        const saldoAkhir = saldoBulanSebelumnya + surplusDefisit;

        laporan.push({
          monthName: MONTHS[m],
          saldoAwal: saldoBulanSebelumnya,
          penerimaan: {
            iuran: totalIuranBulanIni,
            lain: penerimaanLain,
            total: totalPenerimaan,
          },
          rutin,
          totalRutin,
          tidakRutin,
          totalTidakRutin,
          surplusDefisit,
          saldoAkhir,
        });

        saldoBulanSebelumnya = saldoAkhir;
      }
      return laporan;
    }, [residents, transactions, selectedYearLap, saldoAwalTahun]);

    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Laporan Kas RT 09/18
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={selectedYearLap}
              onChange={(e) => setSelectedYearLap(Number(e.target.value))}
              className="bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg block p-2 shadow-sm"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  Tahun {y}
                </option>
              ))}
            </select>
            <button
              className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 ml-auto"
              title="Cetak Laporan"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Geser tabel ke kanan untuk melihat rincian bulan.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="bg-slate-100 text-slate-700 uppercase">
                <tr>
                  <th className="sticky left-0 bg-slate-100 p-3 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap min-w-[200px]">
                    KETERANGAN
                  </th>
                  {MONTHS.map((m) => (
                    <th
                      key={m}
                      className="px-3 py-3 border-b border-slate-200 text-right min-w-[90px]"
                    >
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                <tr className="bg-blue-50/50 font-semibold border-b border-slate-200">
                  <td className="sticky left-0 bg-blue-50 p-3 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    (I) Saldo Awal
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {formatRp(d.saldoAwal)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-slate-50 font-bold border-b border-slate-200">
                  <td className="sticky left-0 bg-slate-50 p-2 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    (II) Penerimaan
                  </td>
                  <td colSpan={12}></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    1. Iuran Bulanan Warga
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {formatRp(d.penerimaan.iuran)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    2. Penerimaan Lain-lain
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.penerimaan.lain > 0
                        ? formatRp(d.penerimaan.lain)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-green-50/30 font-semibold text-green-800">
                  <td className="sticky left-0 bg-green-50/80 p-2 text-right pr-4 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    Jumlah (II)
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {formatRp(d.penerimaan.total)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-slate-50 font-bold border-b border-slate-200">
                  <td className="sticky left-0 bg-slate-50 p-2 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    (III) Pengeluaran Rutin
                  </td>
                  <td colSpan={12}></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    1. Gaji Petugas Keamanan
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.rutin.keamanan > 0 ? formatRp(d.rutin.keamanan) : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    2. Gaji Petugas Kebersihan
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.rutin.kebersihan > 0
                        ? formatRp(d.rutin.kebersihan)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    3. Kas RW
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.rutin.kasRW > 0 ? formatRp(d.rutin.kasRW) : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    4. Iuran Posyandu
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.rutin.posyandu > 0 ? formatRp(d.rutin.posyandu) : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    5. LSK
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.rutin.lsk > 0 ? formatRp(d.rutin.lsk) : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    6. Admin BANK
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.rutin.adminBank > 0
                        ? formatRp(d.rutin.adminBank)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-red-50/50 font-semibold text-red-700">
                  <td className="sticky left-0 bg-red-50 p-2 text-right pr-4 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    Jumlah (III)
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {formatRp(d.totalRutin)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-slate-50 font-bold border-b border-slate-200">
                  <td className="sticky left-0 bg-slate-50 p-2 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    (IV) Pengeluaran Tidak Rutin
                  </td>
                  <td colSpan={12}></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    1. THR (Keamanan & Kebersihan)
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.tidakRutin.thr > 0 ? formatRp(d.tidakRutin.thr) : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    2. Perbaikan/Perawatan
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.tidakRutin.perbaikan > 0
                        ? formatRp(d.tidakRutin.perbaikan)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    3. Biaya Rapat / Pertemuan
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.tidakRutin.rapat > 0
                        ? formatRp(d.tidakRutin.rapat)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    4. Kegiatan 17 Ags, Pengajian
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.tidakRutin.kegiatan > 0
                        ? formatRp(d.tidakRutin.kegiatan)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    5. Dana Sosial
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.tidakRutin.sosial > 0
                        ? formatRp(d.tidakRutin.sosial)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white p-2 pl-6 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    6. Gorol / Jasa Kebersihan
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.tidakRutin.gorong > 0
                        ? formatRp(d.tidakRutin.gorong)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-200 bg-orange-50/50 font-semibold text-orange-700">
                  <td className="sticky left-0 bg-orange-50 p-2 text-right pr-4 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    Jumlah (IV)
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td key={i} className="px-3 py-2 text-right">
                      {d.totalTidakRutin > 0
                        ? formatRp(d.totalTidakRutin)
                        : '-'}
                    </td>
                  ))}
                </tr>
                <tr className="bg-slate-100/80 font-bold border-b border-slate-300">
                  <td className="sticky left-0 bg-slate-100 p-3 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    (V) (Defisit) / Surplus ( II-III-IV )
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td
                      key={i}
                      className={`px-3 py-3 text-right ${
                        d.surplusDefisit < 0 ? 'text-red-600' : 'text-slate-700'
                      }`}
                    >
                      {formatRp(d.surplusDefisit)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-yellow-200/60 font-bold border-t-2 border-slate-400">
                  <td className="sticky left-0 bg-yellow-100 p-3 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-slate-800">
                    SALDO AKHIR KAS ( I + V )
                  </td>
                  {laporanTahunIni.map((d, i) => (
                    <td
                      key={i}
                      className="px-3 py-3 text-right text-slate-800 text-sm"
                    >
                      {formatRp(d.saldoAkhir)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const InfoView = () => {
    const [showAset, setShowAset] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [infoData, setInfoData] = useState({
      title: '',
      desc: '',
      fileName: '',
    });

    // REVISI 2: State dan logika form aset warga
    const [showAsetForm, setShowAsetForm] = useState(false);
    const [asetBaruName, setAsetBaruName] = useState('');
    const [asetBaruCount, setAsetBaruCount] = useState('');

    const handleSaveInfo = (e) => {
      e.preventDefault();
      const newAgenda = {
        id: Date.now(),
        title: infoData.title,
        desc: infoData.desc,
        fileName: infoData.fileName,
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        }),
      };
      const newAgendas = [newAgenda, ...agendas];
      setAgendas(newAgendas);
      saveToDatabase('agendas', newAgendas);
      setShowForm(false);
      setInfoData({ title: '', desc: '', fileName: '' });
    };

    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setInfoData({ ...infoData, fileName: e.target.files[0].name });
      }
    };

    const handleSaveAset = (e) => {
      e.preventDefault();
      const newAset = {
        id: Date.now(),
        name: asetBaruName,
        count: asetBaruCount,
      };
      const newAssetsList = [...assets, newAset];
      setAssets(newAssetsList);
      saveToDatabase('assets', newAssetsList);
      setAsetBaruName('');
      setAsetBaruCount('');
      setShowAsetForm(false);
    };

    const deleteAset = (id) => {
      if (userRole !== 'PENGURUS') return;
      const newAssetsList = assets.filter((a) => a.id !== id);
      setAssets(newAssetsList);
      saveToDatabase('assets', newAssetsList);
    };

    return (
      <div className="space-y-6 pb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">
            Informasi & Kegiatan
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            Bagikan info pengajian, rapat, gorol, dll.
          </p>

          {!showForm && userRole === 'PENGURUS' && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-blue-50 text-blue-600 border border-blue-200 p-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-100 shadow-sm mb-4"
            >
              <PlusCircle className="w-5 h-5" /> Tulis Informasi Baru
            </button>
          )}

          {showForm && userRole === 'PENGURUS' && (
            <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-sm animate-in fade-in mb-4">
              <h3 className="font-bold text-slate-700 mb-3 text-sm">
                Buat Informasi Baru
              </h3>
              <form onSubmit={handleSaveInfo} className="space-y-3">
                <input
                  type="text"
                  placeholder="Judul (Contoh: Undangan Rapat)"
                  required
                  value={infoData.title}
                  onChange={(e) =>
                    setInfoData({ ...infoData, title: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-lg text-sm p-2.5 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Keterangan lengkap..."
                  required
                  rows="3"
                  value={infoData.desc}
                  onChange={(e) =>
                    setInfoData({ ...infoData, desc: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-lg text-sm p-2.5 focus:ring-blue-500"
                ></textarea>

                {/* REVISI 1: Teks Upload PDF / JPG diperjelas */}
                <div className="border border-dashed border-slate-300 rounded-lg p-3 text-center relative hover:bg-slate-50 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Klik untuk upload JPG/PDF"
                  />
                  {infoData.fileName ? (
                    <div className="flex flex-col items-center justify-center gap-1 text-green-600">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-xs font-medium truncate w-full px-4">
                        {infoData.fileName}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 text-slate-500">
                      <UploadCloud className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-medium">
                        Klik untuk upload file JPG / PDF
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold"
                  >
                    Posting Info
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3 mt-2">
            {agendas.length === 0 ? (
              <div className="text-center p-6 bg-white border border-slate-100 rounded-xl shadow-sm">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-medium">
                  Belum ada informasi.
                </p>
              </div>
            ) : (
              agendas.map((agenda) => (
                <div
                  key={agenda.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2 relative"
                >
                  {userRole === 'PENGURUS' && (
                    <button
                      onClick={() => {
                        const newAgendas = agendas.filter(
                          (a) => a.id !== agenda.id
                        );
                        setAgendas(newAgendas);
                        saveToDatabase('agendas', newAgendas);
                      }}
                      className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded w-fit">
                    {agenda.date}
                  </span>
                  <h4 className="font-bold text-slate-800 pr-12">
                    {agenda.title}
                  </h4>
                  <p className="text-xs text-slate-600 whitespace-pre-line">
                    {agenda.desc}
                  </p>
                  {agenda.fileName && (
                    <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      {agenda.fileName.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                      <span className="text-xs text-slate-600 font-medium truncate">
                        {agenda.fileName}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* --- REVISI 2: FOLDER ASET RT09 --- */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1 mt-8">
            Inventaris Warga
          </h2>
          <button
            onClick={() => setShowAset(!showAset)}
            className="w-full bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Box className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-bold text-slate-700">ASET RT09</span>
            </div>
            {showAset ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showAset && (
            <div className="mt-3 animate-in fade-in duration-200">
              {userRole === 'PENGURUS' && !showAsetForm && (
                <button
                  onClick={() => setShowAsetForm(true)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl font-bold flex items-center justify-center gap-2 mb-3 shadow-sm text-sm"
                >
                  <PlusCircle className="w-4 h-4" /> Tambah Aset Baru
                </button>
              )}
              {showAsetForm && userRole === 'PENGURUS' && (
                <form
                  onSubmit={handleSaveAset}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-3 space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Nama Aset (Cth: Kursi)"
                    required
                    value={asetBaruName}
                    onChange={(e) => setAsetBaruName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg text-sm p-2.5"
                  />
                  <input
                    type="text"
                    placeholder="Jumlah (Cth: 120 Unit)"
                    required
                    value={asetBaruCount}
                    onChange={(e) => setAsetBaruCount(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg text-sm p-2.5"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAsetForm(false)}
                      className="flex-1 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-bold"
                    >
                      Simpan Aset
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-2 gap-3">
                {assets.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm text-center flex flex-col justify-center items-center relative"
                  >
                    {userRole === 'PENGURUS' && (
                      <button
                        onClick={() => deleteAset(item.id)}
                        className="absolute top-1 right-1 p-1.5 text-slate-300 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="font-bold text-slate-700 text-sm mt-2">
                      {item.name}
                    </div>
                    <div className="text-xs text-green-600 font-bold mt-1 bg-green-50 px-2 py-0.5 rounded-full inline-block">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex justify-center">
      <div className="w-full max-w-md bg-slate-50 min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-white px-6 py-4 shadow-sm z-10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-green-700 tracking-tight">
              VILLA PERMATA MAS 1
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-widest">
              Sistem Kas RT 09/18
            </p>
          </div>
          <div
            className="flex flex-col items-center ml-4 cursor-pointer"
            onClick={() => setUserRole('GUEST')}
          >
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 border border-green-200 shrink-0">
              <span className="font-bold text-sm">RT</span>
            </div>
            <span
              className={`text-[7px] mt-1 font-bold px-1.5 py-0.5 rounded-full border tracking-widest ${
                userRole === 'PENGURUS'
                  ? 'bg-green-600 text-white border-green-700'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              {userRole}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'iuran' && <IuranView />}
          {activeTab === 'thr' && <ThrView />}
          {activeTab === 'kas' && <KasView />}
          {activeTab === 'laporan' && <LaporanView />}
          {activeTab === 'info' && <InfoView />}
          {activeTab === 'pengajian' && <PengajianView />}
        </div>

        {showQrisModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-xs relative flex flex-col items-center">
              <button
                onClick={() => setShowQrisModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-100 text-slate-500 rounded-full z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-extrabold text-blue-800 mb-1 mt-2 text-xl tracking-tight">
                QRIS MANDIRI
              </h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                A.N. IVAN RAHMAN
              </p>
              <div className="w-64 h-64 bg-blue-50 border-2 border-blue-200 rounded-2xl flex items-center justify-center p-2 mb-6 shadow-inner relative overflow-hidden">
                {/* REVISI 4: Panggilan File QRIS Asli (Fullscreen) */}
                <img
                  src="/qris.jpeg"
                  alt="QRIS Asli"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <div
                  style={{ display: 'none' }}
                  className="font-bold text-slate-400"
                >
                  Silakan Upload qris.jpeg
                </div>
              </div>
              <p className="text-[11px] text-center text-slate-500 px-4">
                Silakan scan kode QR di atas untuk melakukan pembayaran otomatis
                via m-banking atau e-wallet.
              </p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-3 flex justify-between items-center z-20">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center flex-1 gap-1 ${
              activeTab === 'dashboard' ? 'text-green-600' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard
              className={`w-5 h-5 ${
                activeTab === 'dashboard' ? 'fill-green-100' : ''
              }`}
            />
            <span className="text-[9px] font-medium">Beranda</span>
          </button>
          <button
            onClick={() => setActiveTab('iuran')}
            className={`flex flex-col items-center flex-1 gap-1 ${
              activeTab === 'iuran' ? 'text-green-600' : 'text-slate-400'
            }`}
          >
            <Users
              className={`w-5 h-5 ${
                activeTab === 'iuran' ? 'fill-green-100' : ''
              }`}
            />
            <span className="text-[9px] font-medium">Iuran</span>
          </button>
          <button
            onClick={() => setActiveTab('kas')}
            className={`flex flex-col items-center flex-1 gap-1 ${
              activeTab === 'kas' ? 'text-green-600' : 'text-slate-400'
            }`}
          >
            <Wallet
              className={`w-5 h-5 ${
                activeTab === 'kas' ? 'fill-green-100' : ''
              }`}
            />
            <span className="text-[9px] font-medium">Transaksi</span>
          </button>
          <button
            onClick={() => setActiveTab('laporan')}
            className={`flex flex-col items-center flex-1 gap-1 ${
              activeTab === 'laporan' ? 'text-green-600' : 'text-slate-400'
            }`}
          >
            <FileSpreadsheet
              className={`w-5 h-5 ${
                activeTab === 'laporan' ? 'fill-green-100' : ''
              }`}
            />
            <span className="text-[9px] font-medium">Laporan</span>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex flex-col items-center flex-1 gap-1 ${
              activeTab === 'info' ? 'text-green-600' : 'text-slate-400'
            }`}
          >
            <Info
              className={`w-5 h-5 ${
                activeTab === 'info' ? 'fill-green-100' : ''
              }`}
            />
            <span className="text-[9px] font-medium">Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
