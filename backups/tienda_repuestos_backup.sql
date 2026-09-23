--
-- PostgreSQL database dump
--

\restrict s1PfrxNAwSw9EdgM5YMuGwbrar5QOdsxJNHu0v8xBZrgUKQO4HXrz07HLXRbvAx

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Motocarro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Motocarro" (
    id integer NOT NULL,
    brand text NOT NULL,
    model text NOT NULL,
    slug text NOT NULL,
    description text,
    price numeric(12,2),
    stock integer DEFAULT 0 NOT NULL,
    "engineType" text,
    displacement integer,
    horsepower numeric(65,30),
    "maxTorque" numeric(65,30),
    transmission text,
    starter text,
    "loadCapacity" integer,
    "fuelTank" numeric(65,30),
    "frontSuspension" text,
    "rearSuspension" text,
    "frontBrake" text,
    "rearBrake" text,
    "bodyDimensions" text,
    tires text,
    equipment text,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Motocarro" OWNER TO postgres;

--
-- Name: Motocarro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Motocarro_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Motocarro_id_seq" OWNER TO postgres;

--
-- Name: Motocarro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Motocarro_id_seq" OWNED BY public."Motocarro".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    reference text NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    brand text NOT NULL,
    category text NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Motocarro id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Motocarro" ALTER COLUMN id SET DEFAULT nextval('public."Motocarro_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Data for Name: Motocarro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Motocarro" (id, brand, model, slug, description, price, stock, "engineType", displacement, horsepower, "maxTorque", transmission, starter, "loadCapacity", "fuelTank", "frontSuspension", "rearSuspension", "frontBrake", "rearBrake", "bodyDimensions", tires, equipment, image, "createdAt", "updatedAt") FROM stdin;
1	Vaisand	DB 200ZH	vaisand-db-200zh	Motocarguero de carga de 197 cc diseñado para labores de transporte y trabajo diario.	15990000.00	0	4 tiempos	197	12.700000000000000000000000000000	13.900000000000000000000000000000	5 velocidades + reversa + bajo	Eléctrico y pedal	750	4.500000000000000000000000000000	Telescópica reforzada	Ballestas de 7 hojas	Disco	Campana	1.80 m x 1.20 m	500 x R12	Farola LED, tablero digital y sistema de bajo.	\N	2026-09-22 04:01:10.902	2026-09-22 04:01:10.902
2	Vaisand	DB 250ZH	vaisand-db-250zh	Motocarguero de 246 cc con refrigeración líquida y capacidad de carga de hasta 850 kg.	18490000.00	0	4 tiempos	246	15.400000000000000000000000000000	19.000000000000000000000000000000	5 velocidades + reversa	Eléctrico y pedal	850	4.500000000000000000000000000000	Telescópica reforzada	Ballestas de 7 hojas	Disco	Campana	1.90 m x 1.25 m	500 x R12	Refrigeración líquida con radiador, luces LED, tacómetro digital y sistema de bajo.	\N	2026-09-22 04:01:10.906	2026-09-22 04:01:10.906
3	Vaisand	DB 300ZH	vaisand-db-300zh	Motocarguero de 272 cc y una tonelada de capacidad de carga, equipado con sistema hidráulico para el volco.	24490000.00	0	4 tiempos	272	19.000000000000000000000000000000	21.000000000000000000000000000000	5 velocidades + reversa	Eléctrico y pedal	1000	4.500000000000000000000000000000	Telescópica reforzada	Ballestas de 7 hojas	Disco	Campana	2.00 m x 1.40 m	500 x R12, doble llanta trasera	Gato hidráulico, doble suspensión delantera, doble llanta trasera y sistema de volco.	\N	2026-09-22 04:01:10.908	2026-09-22 04:01:10.908
4	Kameyo	MTRD 200	kameyo-mtrd-200	Motocarguero diseñado para labores de logística y transporte diario.	15990000.00	0	4 tiempos, monocilíndrico OHV	197	14.100000000000000000000000000000	17.500000000000000000000000000000	5 velocidades + reversa	Eléctrico y pedal	500	\N	Independiente	Doble amortiguador	Disco hidráulico	Tambor	\N	\N	Tracción trasera con diferencial.	\N	2026-09-22 04:01:10.909	2026-09-22 04:01:10.909
5	Kameyo	MTRD 250	kameyo-mtrd-250	Motocarguero de 246 cc diseñado para trabajo pesado en zonas urbanas y rurales.	18490000.00	0	4 tiempos, monocilíndrico OHV	246	15.500000000000000000000000000000	19.500000000000000000000000000000	5 velocidades + reversa + bajo	Eléctrico y pedal	700	5.000000000000000000000000000000	\N	\N	Disco hidráulico	Campana	\N	\N	Refrigeración líquida, chasis reforzado, puerto USB e iluminación frontal y trasera.	\N	2026-09-22 04:01:10.91	2026-09-22 04:01:10.91
6	Kameyo	MTRD 300	kameyo-mtrd-300	Motocarguero de alta capacidad para trabajo pesado con motor de 296 cc y capacidad de carga de una tonelada.	23790000.00	0	4 tiempos, monocilíndrico OHV	296	22.000000000000000000000000000000	21.000000000000000000000000000000	5 velocidades + reversa + bajo	Eléctrico y pedal	1000	4.500000000000000000000000000000	Telescópica reforzada	Muelles reforzados	Disco hidráulico	Tambor hidráulico	2.20 m x 1.40 m de platón	4.50-R12	Volco, farola LED, tablero digital, puerto USB y sistema eléctrico de 12 V.	\N	2026-09-22 04:01:10.911	2026-09-22 04:01:10.911
7	Kameyo	AGR 300	kameyo-agr-300	Motocarguero utilitario 4x4 diseñado para trabajo pesado y terrenos de alta exigencia.	35990000.00	0	4 tiempos, monocilíndrico OHV	275	17.000000000000000000000000000000	21.000000000000000000000000000000	5 velocidades + reversa	\N	800	\N	Reforzada de 11 hojas	Reforzada de 11 hojas	\N	\N	1.40 m x 2.20 m de platón expandido	\N	Tracción 4x4, winche eléctrico, volco eléctrico, cabina con panorámico, iluminación LED y pantalla digital.	\N	2026-09-22 04:01:10.912	2026-09-22 04:01:10.912
8	AYCO	AY200ZH	ayco-ay200zh	Motocarguero AYCO de 197 cc con refrigeración por aire reforzado y capacidad de carga de 500 kg.	16790000.00	0	4 tiempos ecológico OHV	197	13.000000000000000000000000000000	13.900000000000000000000000000000	5 velocidades + bajo + reversa	Eléctrico y pedal	500	5.800000000000000000000000000000	Barras telescópicas	Muelles	Disco	Hidráulico	1.75 m x 1.25 m	4.50-12, 8 lonas	Carburador, encendido CDI y transmisión final por cardán.	\N	2026-09-22 04:01:10.914	2026-09-22 04:01:10.914
9	AYCO	AY200ZH-2	ayco-ay200zh-2	Versión AYCO 200 con refrigeración líquida y capacidad de carga de 500 kg.	17990000.00	0	4 tiempos ecológico OHV	197	13.000000000000000000000000000000	13.900000000000000000000000000000	5 velocidades + bajo + reversa	Eléctrico y pedal	500	5.800000000000000000000000000000	Barras telescópicas	Muelles	Disco	Hidráulico	1.75 m x 1.25 m	4.50-12, 8 lonas	Refrigeración líquida, carburador, encendido CDI y transmisión final por cardán.	\N	2026-09-22 04:01:10.915	2026-09-22 04:01:10.915
10	AYCO	AY300ZHS	ayco-ay300zhs	Motocarguero AYCO 300 con platón fijo, motor de 272 cc y capacidad de carga de una tonelada.	23990000.00	0	4 tiempos ecológico OHV	272	19.000000000000000000000000000000	19.500000000000000000000000000000	5 velocidades + bajo + reversa	Eléctrico y pedal	1000	5.800000000000000000000000000000	Barras telescópicas	Muelles reforzados	Disco	Hidráulico	3.16 m x 1.33 m x 1.25 m	4.50-12, 8 lonas	Platón fijo, transmisión final por cardán y encendido CDI.	\N	2026-09-22 04:01:10.916	2026-09-22 04:01:10.916
11	AYCO	AY300ZHV	ayco-ay300zhv	Motocarguero AYCO 300 tipo volqueta con sistema electrohidráulico de levante.	25990000.00	0	4 tiempos ecológico OHV	272	19.000000000000000000000000000000	19.500000000000000000000000000000	5 velocidades + bajo + reversa	Eléctrico y pedal	1000	5.800000000000000000000000000000	Barras telescópicas	Muelles reforzados	Disco	Hidráulico	1.90 m x 1.40 m de volquete	4.50-12, 8 lonas	Volqueta metálica con accionamiento electrohidráulico mediante botón.	\N	2026-09-22 04:01:10.918	2026-09-22 04:01:10.918
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, slug, reference, description, price, stock, brand, category, image, "createdAt", "updatedAt") FROM stdin;
1	Filtro de aceite Bosch	filtro-de-aceite-bosch	BOS-F001	Filtro de aceite Bosch diseñado para ayudar a mantener limpio el aceite del motor y proteger sus componentes.	45000.00	15	Bosch	Filtros	https://c0.uidownload.com/pngpics/999/2088/car-oil-filter-bosch-oil-filter-synthetic-oil-filter-vehicle-maintenance-automotive-filtration-engine-lubrication-car-service-parts.png	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
2	Pastillas de freno Brembo	pastillas-de-freno-brembo	BRM-P06101	Juego de pastillas de freno Brembo para aplicaciones automotrices seleccionadas, diseñado para ofrecer una frenada confiable.	85000.00	8	Brembo	Frenos	https://contentassets.autozone.com/product_image/USA/1684/BBHN/P06101N/P06101N-06.jpg?imwidth=1920	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
3	Bujías NGK	bujias-ngk	NGK-B001	Bujías NGK para sistemas de encendido de motores a gasolina.	28000.00	25	NGK	Motor	https://scdn.autodoc.de/catalog/categories/600x600/10251.png	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
4	Filtro de aire MANN	filtro-de-aire-mann	MANN-A001	Filtro de aire MANN diseñado para mantener limpio el flujo de aire que ingresa al motor.	38000.00	12	MANN-Filter	Filtros	https://www.fb-tuning.de/Produktbilder/shop565px/60069451_001.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
5	Amortiguador Monroe	amortiguador-monroe	MON-376154	Amortiguador Monroe para sistemas de suspensión automotriz.	185000.00	6	Monroe	Suspensión	https://cdn.autodoc.de/thumb?id=7436595&lng=se&m=0&n=0&rev=94078007	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
6	Filtro de combustible	filtro-de-combustible	COMB-F001	Filtro de combustible en línea diseñado para retener contaminantes y ayudar a mantener limpio el sistema de alimentación.	32000.00	18	Genérica	Filtros	https://s.alicdn.com/@sc04/kf/Haaa66255b47b4afd889a70b5abde73e7X/Car-Motorcycle-Filtro-De-Combustible-Fuel-Filter-for-Mitsubishi-Chevrolet-Nissan-Bmw-Benz-Suzuki-Honda-Isuzu-Toyota-Hyundai.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
7	Alternador automotriz	alternador-automotriz	ALT-001	Alternador de reemplazo para el sistema eléctrico del vehículo y la carga de la batería.	420000.00	4	Genérica	Eléctrico	https://i.ebayimg.com/images/g/xioAAOSwhkpmBwWz/s-l1200.webp	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
8	Motor de arranque	motor-de-arranque	STA-001	Motor de arranque para sistemas de encendido automotriz.	310000.00	5	Genérica	Eléctrico	https://modernautoparts.co.za/cdn/shop/collections/bf4033ab9960051c3eed438397c01e14_2fe3b2ce-9571-4911-bc4e-ef70f3c8bd73_600x600_crop_center.png?v=1752244141	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
9	Kit de distribución INA	kit-de-distribucion-ina	INA-TB001	Kit de distribución con correa, tensores y componentes necesarios para el mantenimiento del sistema.	295000.00	7	INA	Motor	https://images.lteplatform.com/images/products/600x600/348440148.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
10	Pinza de freno	pinza-de-freno	CAL-001	Pinza de freno para sistemas de frenado hidráulico.	240000.00	5	Genérica	Frenos	https://rst.lineteco.com/storage/products-amin/braking-system/brake-caliper.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
11	Kit de embrague	kit-de-embrague	CLU-001	Conjunto de embrague para vehículos con transmisión manual.	520000.00	3	Genérica	Transmisión	https://www.espaceauto92.fr/embriage.png	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
12	Rodamiento de rueda	rodamiento-de-rueda	WHB-001	Rodamiento sellado para conjunto de rueda automotriz.	95000.00	10	Genérica	Suspensión	https://cdn.shopify.com/s/files/1/0441/8748/4320/products/2_ef2273be-ef2c-4305-8a0b-616a27376c1a.png?v=1611236433	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
13	Brazo de control de suspensión	brazo-de-control	CTRL-001	Brazo de control para el sistema de suspensión y alineación del vehículo.	165000.00	7	MOOG	Suspensión	https://static.summitracing.com/global/images/prod/xlarge/mog-rk620168_xl.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
14	Terminal de dirección TRW	terminal-de-direccion-trw	TRW-JTE1054	Terminal de dirección para el sistema de dirección del vehículo.	72000.00	14	TRW	Dirección	https://hometowneautorepairandtireofwoodbridge.com/blog/wp-content/uploads/2017/01/Inner-and-outer-tie-rods.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
15	Bobina de encendido	bobina-de-encendido	IGN-001	Bobina de encendido para sistemas de ignición de motores.	110000.00	9	Genérica	Eléctrico	https://static.summitracing.com/global/images/prod/xlarge/sum-850501-1b_xl.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
16	Correa auxiliar	correa-auxiliar	BELT-001	Correa auxiliar de múltiples nervaduras para accesorios del motor.	65000.00	11	Genérica	Motor	https://cdn3.s1partscenter.com/images/source/78d/b3a/353/6d58fa45e7.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
17	Termostato automotriz	termostato-automotriz	THERM-001	Termostato encargado de ayudar a regular la temperatura de operación del motor.	55000.00	13	Genérica	Refrigeración	https://images.nexusapp.co/assets/8a/be/c4/315638809.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
18	Radiador	radiador-automotriz	RAD-001	Radiador de reemplazo para el sistema de refrigeración del vehículo.	385000.00	4	Genérica	Refrigeración	https://static.summitracing.com/global/images/prod/xlarge/rcg-41-13612_xl.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
19	Faro delantero	faro-delantero	LAMP-001	Faro delantero de reemplazo para el sistema de iluminación automotriz.	480000.00	2	Genérica	Iluminación	https://cld.partsimg.com/image/upload/q_auto%2Cdpr_auto%2Cf_auto/carparts/cpw/lp/popular-parts/headlights	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
20	Disco de freno	disco-de-freno	DISC-001	Disco de freno para sistemas de frenado automotriz.	145000.00	10	JINNGE	Frenos	https://shopcdnpro.grainajz.com/category/372395/2378/e9ef53fbc905b258c5b8c497c4c73620/Spare-Auto-Parts-Oem-Car-Brake-Disc-Rotor-Low-Metal-Disc-For-BMW.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
21	Caja de Reversa	caja-de-reversa	bdc-001	Caja de reversa para carguero universal reforzada, color dorado	303001.00	0	BDC	Caja	https://shopcdnpro.grainajz.com/category/372395/2378/e9ef53fbc905b258c5b8c497c4c73620/Spare-Auto-Parts-Oem-Car-Brake-Disc-Rotor-Low-Metal-Disc-For-BMW.jpg	2026-09-22 03:33:33.91	2026-09-22 03:33:33.91
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ea6ceba9-5938-4107-b197-b13aa6858551	d802e9bd1c13f249d652b2dce8a6c77c7a32190540399127a4c603c6f18dc445	2026-09-21 22:28:13.865877-05	20260922032813_add_motocargueros	\N	\N	2026-09-21 22:28:13.828487-05	1
\.


--
-- Name: Motocarro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Motocarro_id_seq"', 11, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 21, true);


--
-- Name: Motocarro Motocarro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Motocarro"
    ADD CONSTRAINT "Motocarro_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Motocarro_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Motocarro_slug_key" ON public."Motocarro" USING btree (slug);


--
-- Name: Product_reference_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_reference_key" ON public."Product" USING btree (reference);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict s1PfrxNAwSw9EdgM5YMuGwbrar5QOdsxJNHu0v8xBZrgUKQO4HXrz07HLXRbvAx

