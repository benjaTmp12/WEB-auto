# AutoMarket — Proyecto #05: Anuncios de Automóviles

> Portal de anuncios de autos inspirado en [Chileautos](https://www.chileautos.cl/)  
> MVP Grupal · Stack: **Express + Sequelize + MySQL** + **React + Vite**

---

## 🚀 Cómo ejecutar en local

### Requisitos previos
- Node.js ≥ 18
- MySQL corriendo localmente (puerto 3306)

### 1. Clonar e instalar

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO
```

### 2. Configurar el Backend

```bash
cd server
cp .env.example .env
# Editar .env con tus credenciales de MySQL
npm install
npm run dev
```

> El servidor arranca en **http://localhost:3001**  
> En modo `development`, Sequelize sincroniza los modelos automáticamente.

### 3. Configurar el Frontend

```bash
cd client
cp .env.example .env
# VITE_API_URL=http://localhost:3001/api/v1 (ya configurado)
npm install
npm run dev
```

> La app arranca en **http://localhost:5173**

---

## 🗄️ Base de datos

La base de datos se crea automáticamente al arrancar en desarrollo (`sync: alter`).  
Para producción, usa migraciones:

```bash
cd server
npx sequelize-cli db:migrate
```

**Tablas creadas:**
- `Users` — registro y autenticación de vendedores
- `Anuncios` — publicaciones de automóviles

---

## 📡 API Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/v1/health` | No | Health check |
| POST | `/api/v1/auth/register` | No | Registro de usuario |
| POST | `/api/v1/auth/login` | No | Login → devuelve JWT |
| GET | `/api/v1/auth/me` | JWT | Perfil del usuario actual |
| GET | `/api/v1/anuncios` | No | Listado con filtros |
| GET | `/api/v1/anuncios/:id` | No | Detalle de anuncio |
| POST | `/api/v1/anuncios` | JWT | Publicar anuncio |
| PUT | `/api/v1/anuncios/:id` | JWT+Owner | Editar anuncio |
| PATCH | `/api/v1/anuncios/:id/vendido` | JWT+Owner | Marcar como vendido |
| GET | `/api/v1/anuncios/mis-anuncios` | JWT | Mis anuncios |

**Filtros disponibles en `GET /api/v1/anuncios`:**
```
?marca=Toyota&precioMin=5000000&precioMax=15000000
```

---

## URLs de Producción

| Componente | URL |
|------------|-----|
| Frontend | `https://web-auto-ten.vercel.app` |
| API | `https://web-auto-production-e8ed.up.railway.app` |

### Usuario de prueba
```
Email: test@automarket.cl
Password: Test1234
```

---

##  Historias de Usuario Implementadas

### Generales (GEN)
- [x] **GEN-01** Repositorio ejecutable — `npm run dev` en `/server` y `/client`
- [x] **GEN-02** Variables de entorno documentadas — `server/.env.example` y `client/.env.example`
- [x] **GEN-03** Base de datos y modelos — Sequelize + MySQL: tablas `Users` y `Anuncios`
- [x] **GEN-04** Registro de usuario — `POST /auth/register` + página `/register`
- [x] **GEN-05** Login con JWT — `POST /auth/login` + interceptor en Axios
- [x] **GEN-06** Frontend integrado al dominio — React consume API en 6 páginas
- [x] **GEN-07** Deploy público — instrucciones en este README

### Dominio (HU)
- [x] **HU-01** Modelar anuncios — campos: marca, modelo, año, precio, km, estado
- [x] **HU-02** Publicar anuncio — formulario autenticado → `POST /anuncios`
- [x] **HU-03** Listado público — página Home sin login con cards
- [x] **HU-04** Detalle de anuncio — página `/anuncios/:id` con todos los campos
- [x] **HU-05** Filtrar anuncios — filtros por marca y rango de precio en UI
- [x] **HU-06** Editar anuncio propio — formulario pre-poblado → `PUT /anuncios/:id`
- [x] **HU-07** Marcar como vendido — botón + `PATCH /anuncios/:id/vendido`
- [x] **HU-08** Solo el dueño edita — middleware `isOwner` → 403 + bloqueo en UI

---

## 🏗️ Estructura del proyecto

```
WEB-auto/
├── server/                 # Backend Express + Sequelize + MySQL
│   ├── src/
│   │   ├── config/         # Conexión a la BD
│   │   ├── models/         # User.js, Anuncio.js
│   │   ├── routes/         # auth.routes.js, anuncios.routes.js
│   │   ├── controllers/    # Delegación a servicios
│   │   ├── services/       # Lógica de negocio
│   │   └── middlewares/    # auth.middleware.js, owner.middleware.js
│   ├── migrations/         # Para producción
│   ├── .env.example
│   └── index.js
└── client/                 # Frontend React + Vite
    ├── src/
    │   ├── api/            # axios.js + endpoints.js
    │   ├── context/        # AuthContext.jsx
    │   ├── components/     # Navbar, AnuncioCard, FiltroBar, ProtectedRoute
    │   └── pages/          # Home, Detalle, Login, Register, Publicar, Editar, MisAnuncios
    └── .env.example
```

---

## 🚀 Deploy

### Backend (Railway)
1. Crear proyecto en [Railway](https://railway.app)
2. Añadir servicio MySQL
3. Añadir servicio Node.js y conectar el repo (carpeta `server/`)
4. Configurar variables de entorno desde `.env.example`
5. En Railway, el `DATABASE_URL` se configura automáticamente

### Frontend (Vercel)
1. Ir a [Vercel](https://vercel.com) → New Project
2. Importar el repo, seleccionar carpeta `client/` como root
3. Configurar variable de entorno: `VITE_API_URL=https://tu-api.railway.app/api/v1`
4. Deploy automático

---

*Proyecto desarrollado para el MVP Grupal — Programación Web*
