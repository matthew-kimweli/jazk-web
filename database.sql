-- --------------------------------------------------------
-- Host:                         157.230.47.71
-- Server version:               PostgreSQL 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1) on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for function public.array_add
DROP FUNCTION IF EXISTS "array_add";
DELIMITER //
CREATE FUNCTION "array_add"(array JSONB, values JSONB) RETURNS JSONB AS $$  SELECT array_to_json(ARRAY(SELECT unnest(ARRAY(SELECT DISTINCT jsonb_array_elements("array")) || ARRAY(SELECT jsonb_array_elements("values")))))::jsonb;  $$//
DELIMITER ;

-- Dumping structure for function public.array_add_unique
DROP FUNCTION IF EXISTS "array_add_unique";
DELIMITER //
CREATE FUNCTION "array_add_unique"(array JSONB, values JSONB) RETURNS JSONB AS $$  SELECT array_to_json(ARRAY(SELECT DISTINCT unnest(ARRAY(SELECT DISTINCT jsonb_array_elements("array")) || ARRAY(SELECT DISTINCT jsonb_array_elements("values")))))::jsonb;  $$//
DELIMITER ;

-- Dumping structure for function public.array_contains
DROP FUNCTION IF EXISTS "array_contains";
DELIMITER //
CREATE FUNCTION "array_contains"(array JSONB, values JSONB) RETURNS BOOLEAN AS $$  SELECT RES.CNT >= 1 FROM (SELECT COUNT(*) as CNT FROM jsonb_array_elements("array") as elt WHERE elt IN (SELECT jsonb_array_elements("values"))) as RES;  $$//
DELIMITER ;

-- Dumping structure for function public.array_contains_all
DROP FUNCTION IF EXISTS "array_contains_all";
DELIMITER //
CREATE FUNCTION "array_contains_all"(array JSONB, values JSONB) RETURNS BOOLEAN AS $$  SELECT CASE WHEN 0 = jsonb_array_length("values") THEN true = false ELSE (SELECT RES.CNT = jsonb_array_length("values") FROM (SELECT COUNT(*) as CNT FROM jsonb_array_elements_text("array") as elt WHERE elt IN (SELECT jsonb_array_elements_text("values"))) as RES) END;  $$//
DELIMITER ;

-- Dumping structure for function public.array_contains_all_regex
DROP FUNCTION IF EXISTS "array_contains_all_regex";
DELIMITER //
CREATE FUNCTION "array_contains_all_regex"(array JSONB, values JSONB) RETURNS BOOLEAN AS $$  SELECT CASE WHEN 0 = jsonb_array_length("values") THEN true = false ELSE (SELECT RES.CNT = jsonb_array_length("values") FROM (SELECT COUNT(*) as CNT FROM jsonb_array_elements_text("array") as elt WHERE elt LIKE ANY (SELECT jsonb_array_elements_text("values"))) as RES) END;  $$//
DELIMITER ;

-- Dumping structure for function public.array_remove
DROP FUNCTION IF EXISTS "array_remove";
DELIMITER //
CREATE FUNCTION "array_remove"(array JSONB, values JSONB) RETURNS JSONB AS $$  SELECT array_to_json(ARRAY(SELECT * FROM jsonb_array_elements("array") as elt WHERE elt NOT IN (SELECT * FROM (SELECT jsonb_array_elements("values")) AS sub)))::jsonb;  $$//
DELIMITER ;

-- Dumping structure for function public.idempotency_delete_expired_records
DROP FUNCTION IF EXISTS "idempotency_delete_expired_records";
DELIMITER //
CREATE FUNCTION "idempotency_delete_expired_records"() RETURNS UNKNOWN AS $$  BEGIN DELETE FROM "_Idempotency" WHERE expire < NOW() - INTERVAL '300 seconds'; END;  $$//
DELIMITER ;

-- Dumping structure for function public.json_object_set_key
DROP FUNCTION IF EXISTS "json_object_set_key";
DELIMITER //
CREATE FUNCTION "json_object_set_key"(json JSONB, key_to_set TEXT, value_to_set UNKNOWN) RETURNS JSONB AS $$  SELECT concat('{', string_agg(to_json("key") || ':' || "value", ','), '}')::jsonb FROM (SELECT * FROM jsonb_each("json") WHERE key <> key_to_set UNION ALL SELECT key_to_set, to_json("value_to_set")::jsonb) AS fields  $$//
DELIMITER ;

-- Dumping structure for table public.alembic_version
DROP TABLE IF EXISTS "alembic_version";
CREATE TABLE IF NOT EXISTS "alembic_version" (
	"version_num" VARCHAR(32) NOT NULL,
	PRIMARY KEY ("version_num")
);

-- Dumping data for table public.alembic_version: 1 rows
/*!40000 ALTER TABLE "alembic_version" DISABLE KEYS */;
INSERT INTO "alembic_version" ("version_num") VALUES
	('0b176b23d7c9');
/*!40000 ALTER TABLE "alembic_version" ENABLE KEYS */;

-- Dumping structure for table public.AppSettings
DROP TABLE IF EXISTS "AppSettings";
CREATE TABLE IF NOT EXISTS "AppSettings" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public.AppSettings: -1 rows
/*!40000 ALTER TABLE "AppSettings" DISABLE KEYS */;
/*!40000 ALTER TABLE "AppSettings" ENABLE KEYS */;

-- Dumping structure for table public.attributedefinition
DROP TABLE IF EXISTS "attributedefinition";
CREATE TABLE IF NOT EXISTS "attributedefinition" (
	"attr_sys_id" SERIAL NOT NULL,
	"attr_name" VARCHAR NOT NULL,
	"data_type" VARCHAR NOT NULL,
	"entity_type" VARCHAR NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("attr_sys_id"),
	INDEX "ix_attributedefinition_attr_name" ("attr_name"),
	INDEX "ix_attributedefinition_attr_sys_id" ("attr_sys_id")
);

-- Dumping data for table public.attributedefinition: 7 rows
/*!40000 ALTER TABLE "attributedefinition" DISABLE KEYS */;
INSERT INTO "attributedefinition" ("attr_sys_id", "attr_name", "data_type", "entity_type", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, 'Policy Type', 'string', 'Product', '2024-07-25 11:42:59.354203', NULL, NULL, NULL),
	(2, 'Cover Type', 'string', 'Product', '2024-07-25 12:21:45.343895', NULL, NULL, NULL),
	(3, 'Vehicle Usage (Type)', 'string', 'Product', '2024-07-25 12:57:33.102823', NULL, NULL, NULL),
	(4, 'Body Type', 'string', 'Product', '2024-07-25 13:03:18.290612', NULL, NULL, NULL),
	(5, 'Vehicle Make', 'string', 'Product', '2024-07-25 13:44:05.156955', NULL, NULL, NULL),
	(6, 'Vehicle Model', 'string', 'Product', '2024-07-25 14:23:02.738687', NULL, NULL, NULL),
	(7, 'Branch', 'string', 'Product', '2024-08-02 21:47:09.76049', NULL, NULL, NULL);
/*!40000 ALTER TABLE "attributedefinition" ENABLE KEYS */;

-- Dumping structure for table public.charge
DROP TABLE IF EXISTS "charge";
CREATE TABLE IF NOT EXISTS "charge" (
	"chg_sys_id" SERIAL NOT NULL,
	"chg_code" VARCHAR NOT NULL,
	"chg_desc" VARCHAR NOT NULL,
	"chg_annual_rate" DOUBLE PRECISION NOT NULL,
	"chg_rate_per" DOUBLE PRECISION NOT NULL,
	"chg_frz_flag" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("chg_sys_id"),
	INDEX "ix_charge_chg_code" ("chg_code"),
	INDEX "ix_charge_chg_desc" ("chg_desc"),
	INDEX "ix_charge_chg_sys_id" ("chg_sys_id")
);

-- Dumping data for table public.charge: 3 rows
/*!40000 ALTER TABLE "charge" DISABLE KEYS */;
INSERT INTO "charge" ("chg_sys_id", "chg_code", "chg_desc", "chg_annual_rate", "chg_rate_per", "chg_frz_flag", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, '2004', 'Insurance Training Levy', 0.2, 100, 'false', '2024-07-22 16:42:39.131906', NULL, NULL, NULL),
	(2, '2001', 'Stamp Duty', 40, 1, 'false', '2024-07-22 16:42:39.131906', NULL, NULL, NULL),
	(3, '1004', 'Policy Holder Fund', 0.25, 100, 'false', '2024-07-22 16:42:39.131906', NULL, NULL, NULL);
/*!40000 ALTER TABLE "charge" ENABLE KEYS */;

-- Dumping structure for table public.condition
DROP TABLE IF EXISTS "condition";
CREATE TABLE IF NOT EXISTS "condition" (
	"cond_sys_id" SERIAL NOT NULL,
	"cond_code" VARCHAR NOT NULL,
	"cond_desc" VARCHAR NOT NULL,
	"cond_frz_flag" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("cond_sys_id"),
	INDEX "ix_condition_cond_code" ("cond_code"),
	INDEX "ix_condition_cond_desc" ("cond_desc"),
	INDEX "ix_condition_cond_sys_id" ("cond_sys_id")
);

-- Dumping data for table public.condition: -1 rows
/*!40000 ALTER TABLE "condition" DISABLE KEYS */;
/*!40000 ALTER TABLE "condition" ENABLE KEYS */;

-- Dumping structure for table public.cover
DROP TABLE IF EXISTS "cover";
CREATE TABLE IF NOT EXISTS "cover" (
	"cvr_sys_id" SERIAL NOT NULL,
	"cvr_code" VARCHAR NOT NULL,
	"cvr_desc" VARCHAR NOT NULL,
	"cvr_frz_flag" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("cvr_sys_id"),
	INDEX "ix_cover_cvr_code" ("cvr_code"),
	INDEX "ix_cover_cvr_desc" ("cvr_desc"),
	INDEX "ix_cover_cvr_sys_id" ("cvr_sys_id")
);

-- Dumping data for table public.cover: 11 rows
/*!40000 ALTER TABLE "cover" DISABLE KEYS */;
INSERT INTO "cover" ("cvr_sys_id", "cvr_code", "cvr_desc", "cvr_frz_flag", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, '3101', 'Own Damage', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(2, '3105', 'Comesa', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(3, '3109', 'Wind Screen', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(4, '3110', 'Radio Casette', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(5, '3176', 'Third Party Only', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(6, '3177', 'Third Party Fire And Theft', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(7, '3191', 'Personal Accident', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(8, '3196', 'Courtesy Car', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(9, '3198', 'Excess Protector', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(10, '3199', 'Polictical Violence And Terrorism', 'false', '2024-07-22 16:57:15.526717', NULL, NULL, NULL),
	(11, '3980', 'Passenger Legal Liability', 'false', '2024-07-22 16:57:38.928026', NULL, NULL, NULL);
/*!40000 ALTER TABLE "cover" ENABLE KEYS */;

-- Dumping structure for table public.department
DROP TABLE IF EXISTS "department";
CREATE TABLE IF NOT EXISTS "department" (
	"id" SERIAL NOT NULL,
	"dept_code" VARCHAR NOT NULL,
	"dept_name" VARCHAR NOT NULL,
	"dept_frz_flag" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	INDEX "ix_department_dept_code" ("dept_code"),
	INDEX "ix_department_dept_name" ("dept_name"),
	INDEX "ix_department_id" ("id")
);

-- Dumping data for table public.department: 20 rows
/*!40000 ALTER TABLE "department" DISABLE KEYS */;
INSERT INTO "department" ("id", "dept_code", "dept_name", "dept_frz_flag", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, '01', 'Investments', 'false', '2024-07-22 16:10:03.796996', NULL, NULL, NULL),
	(2, '02', 'Finance', 'false', '2024-07-22 16:10:03.832055', NULL, NULL, NULL),
	(3, '03', 'Reinsurance', 'false', '2024-07-22 16:10:03.836718', NULL, NULL, NULL),
	(4, '04', 'HR and Admin', 'false', '2024-07-22 16:10:03.84205', NULL, NULL, NULL),
	(5, '05', 'Underwriting', 'false', '2024-07-22 16:10:03.846593', NULL, NULL, NULL),
	(6, '06', 'Claims', 'false', '2024-07-22 16:10:03.852059', NULL, NULL, NULL),
	(7, '07', 'Marketing', 'false', '2024-07-22 16:10:03.856731', NULL, NULL, NULL),
	(8, '08', 'Central', 'false', '2024-07-22 16:10:03.861434', NULL, NULL, NULL),
	(9, '09', 'ICT', 'false', '2024-07-22 16:10:03.866146', NULL, NULL, NULL),
	(10, '10', 'Motor', 'false', '2024-07-22 16:10:03.870759', NULL, NULL, NULL),
	(11, '11', 'Motor Commercial', 'false', '2024-07-22 16:10:03.876005', NULL, NULL, NULL),
	(12, '20', 'Fire', 'false', '2024-07-22 16:10:03.880981', NULL, NULL, NULL),
	(13, '30', 'Marine', 'false', '2024-07-22 16:10:03.886594', NULL, NULL, NULL),
	(14, '40', 'Engineering', 'false', '2024-07-22 16:10:03.892004', NULL, NULL, NULL),
	(15, '50', 'Accidents & Miscellaneous', 'false', '2024-07-22 16:10:03.897818', NULL, NULL, NULL),
	(16, '60', 'Liability', 'false', '2024-07-22 16:10:03.902884', NULL, NULL, NULL),
	(17, '70', 'Bonds', 'false', '2024-07-22 16:10:03.909142', NULL, NULL, NULL),
	(18, '80', 'Aviation', 'false', '2024-07-22 16:10:03.913712', NULL, NULL, NULL),
	(19, '90', 'Oil and Gas', 'false', '2024-07-22 16:10:03.918024', NULL, NULL, NULL),
	(20, '91', 'Medical', 'false', '2024-07-22 16:10:03.92365', NULL, NULL, NULL);
/*!40000 ALTER TABLE "department" ENABLE KEYS */;

-- Dumping structure for table public.division
DROP TABLE IF EXISTS "division";
CREATE TABLE IF NOT EXISTS "division" (
	"id" SERIAL NOT NULL,
	"divn_comp_code" VARCHAR NOT NULL,
	"divn_code" VARCHAR NOT NULL,
	"divn_name" VARCHAR NOT NULL,
	"divn_short_name" VARCHAR NOT NULL,
	"divn_frz_flag" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	INDEX "ix_division_divn_code" ("divn_code"),
	INDEX "ix_division_divn_name" ("divn_name"),
	INDEX "ix_division_divn_short_name" ("divn_short_name"),
	INDEX "ix_division_id" ("id")
);

-- Dumping data for table public.division: 27 rows
/*!40000 ALTER TABLE "division" DISABLE KEYS */;
INSERT INTO "division" ("id", "divn_comp_code", "divn_code", "divn_name", "divn_short_name", "divn_frz_flag", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, '001', '105', 'Kisumu', 'KSM', 'false', '2024-07-22 16:04:43.070449', NULL, NULL, NULL),
	(2, '001', '104', 'Mombasa', 'MSA', 'false', '2024-07-22 16:04:43.131233', NULL, NULL, NULL),
	(3, '001', '101', 'JAZK HQ', 'JAZK HQ', 'false', '2024-07-22 16:04:43.137329', NULL, NULL, NULL),
	(6, '001', '103', 'Westlands', 'WES', 'false', '2024-07-22 16:04:43.156429', NULL, NULL, NULL),
	(7, '001', '106', 'Nakuru', 'NKR', 'false', '2024-07-22 16:04:43.162193', NULL, NULL, NULL),
	(8, '001', '107', 'Eldoret', 'ELD', 'false', '2024-07-22 16:04:43.16926', NULL, NULL, NULL),
	(9, '001', '108', 'Thika', 'THK', 'false', '2024-07-22 16:04:43.175591', NULL, NULL, NULL),
	(10, '001', '109', 'Meru', 'MRU', 'false', '2024-07-22 16:04:43.180872', NULL, NULL, NULL),
	(11, '001', '110', 'Nyeri', 'NYR', 'false', '2024-07-22 16:04:43.186127', NULL, NULL, NULL),
	(12, '001', '111', 'Kisii', 'KSI', 'false', '2024-07-22 16:04:43.192217', NULL, NULL, NULL),
	(13, '001', '112', 'Bungoma', 'BGM', 'false', '2024-07-22 16:04:43.197952', NULL, NULL, NULL),
	(4, '001', '100', 'Kenya', 'KEN', 'true', '2024-07-22 16:04:43.14338', NULL, NULL, NULL),
	(5, '001', '102', 'Capital Centre', 'TUL', 'true', '2024-07-22 16:04:43.149754', NULL, NULL, NULL),
	(14, '001', '113', 'Customer Service Group (CSG)', 'CSG', 'true', '2024-07-22 16:04:43.223377', NULL, NULL, NULL),
	(15, '001', '114', 'Assessment Centre (MR & Skymall)', 'AC', 'true', '2024-07-22 16:04:43.229273', NULL, NULL, NULL),
	(20, '001', '115', 'UPPER HILL', 'UPPER HILL', 'true', '2024-07-22 16:04:43.258022', NULL, NULL, NULL),
	(19, '001', '116', 'EASTLEND''S', 'EASTLEND''S', 'true', '2024-07-22 16:04:43.252479', NULL, NULL, NULL),
	(18, '001', '117', 'JUBILEE EXCHANGE', 'JUBILEE EXCHANGE', 'true', '2024-07-22 16:04:43.247217', NULL, NULL, NULL),
	(22, '001', '118', 'Digital Lab', 'Digital Lab', 'true', '2024-07-22 16:04:43.269212', NULL, NULL, NULL),
	(21, '001', '119', 'NBI Region Agency 4', 'NBI Region Agency 4', 'true', '2024-07-22 16:04:43.264452', NULL, NULL, NULL),
	(16, '001', '120', 'NBI Region Agency 5', 'NBI Region Agency 5', 'true', '2024-07-22 16:04:43.235285', NULL, NULL, NULL),
	(23, '001', '121', 'NBI Region Agency 1', 'NBI Region Agency 1', 'true', '2024-07-22 16:04:43.278038', NULL, NULL, NULL),
	(24, '001', '122', 'NBI Region Agency 2', 'NBI Region Agency 2', 'true', '2024-07-22 16:04:43.284928', NULL, NULL, NULL),
	(25, '001', '123', 'NBI Region Agency 3', 'NBI Region Agency 3', 'true', '2024-07-22 16:04:43.292298', NULL, NULL, NULL),
	(26, '001', '124', 'NBI Region HQ', 'NBI Region HQ', 'true', '2024-07-22 16:04:43.298583', NULL, NULL, NULL),
	(27, '001', '125', 'ALLIANZ', 'ALLIANZ', 'true', '2024-07-22 16:04:43.303923', NULL, NULL, NULL),
	(17, '001', '126', 'P9 Policies', 'P9 Policies', 'true', '2024-07-22 16:04:43.242438', NULL, NULL, NULL);
/*!40000 ALTER TABLE "division" ENABLE KEYS */;

-- Dumping structure for table public.item
DROP TABLE IF EXISTS "item";
CREATE TABLE IF NOT EXISTS "item" (
	"id" SERIAL NOT NULL,
	"title" VARCHAR NULL DEFAULT NULL,
	"description" VARCHAR NULL DEFAULT NULL,
	"owner_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	INDEX "ix_item_description" ("description"),
	INDEX "ix_item_id" ("id"),
	INDEX "ix_item_title" ("title"),
	CONSTRAINT "item_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "person" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.item: -1 rows
/*!40000 ALTER TABLE "item" DISABLE KEYS */;
/*!40000 ALTER TABLE "item" ENABLE KEYS */;

-- Dumping structure for table public.JazkeQuotation
DROP TABLE IF EXISTS "JazkeQuotation";
CREATE TABLE IF NOT EXISTS "JazkeQuotation" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public.JazkeQuotation: -1 rows
/*!40000 ALTER TABLE "JazkeQuotation" DISABLE KEYS */;
/*!40000 ALTER TABLE "JazkeQuotation" ENABLE KEYS */;

-- Dumping structure for table public.JazkeSale
DROP TABLE IF EXISTS "JazkeSale";
CREATE TABLE IF NOT EXISTS "JazkeSale" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public.JazkeSale: -1 rows
/*!40000 ALTER TABLE "JazkeSale" DISABLE KEYS */;
/*!40000 ALTER TABLE "JazkeSale" ENABLE KEYS */;

-- Dumping structure for table public.payload
DROP TABLE IF EXISTS "payload";
CREATE TABLE IF NOT EXISTS "payload" (
	"pl_sys_id" SERIAL NOT NULL,
	"MCINotification" VARCHAR NOT NULL,
	"payload" JSONB NULL DEFAULT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("pl_sys_id"),
	INDEX "ix_payload_MCINotification" ("MCINotification"),
	INDEX "ix_payload_pl_sys_id" ("pl_sys_id")
);

-- Dumping data for table public.payload: -1 rows
/*!40000 ALTER TABLE "payload" DISABLE KEYS */;
/*!40000 ALTER TABLE "payload" ENABLE KEYS */;

-- Dumping structure for table public.person
DROP TABLE IF EXISTS "person";
CREATE TABLE IF NOT EXISTS "person" (
	"id" SERIAL NOT NULL,
	"full_name" VARCHAR NULL DEFAULT NULL,
	"email" VARCHAR NULL DEFAULT NULL,
	"hashed_password" VARCHAR NULL DEFAULT NULL,
	"is_active" BOOLEAN NULL DEFAULT NULL,
	"is_superuser" BOOLEAN NULL DEFAULT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "ix_person_email" ("email"),
	INDEX "ix_person_full_name" ("full_name"),
	INDEX "ix_person_id" ("id")
);

-- Dumping data for table public.person: -1 rows
/*!40000 ALTER TABLE "person" DISABLE KEYS */;
/*!40000 ALTER TABLE "person" ENABLE KEYS */;

-- Dumping structure for table public.product
DROP TABLE IF EXISTS "product";
CREATE TABLE IF NOT EXISTS "product" (
	"prod_sys_id" SERIAL NOT NULL,
	"prod_code" VARCHAR NOT NULL,
	"prod_desc" VARCHAR NOT NULL,
	"prod_frz_flag" BOOLEAN NOT NULL,
	"prod_class_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("prod_sys_id"),
	INDEX "ix_product_prod_code" ("prod_code"),
	INDEX "ix_product_prod_desc" ("prod_desc"),
	INDEX "ix_product_prod_sys_id" ("prod_sys_id"),
	CONSTRAINT "product_prod_class_sys_id_fkey" FOREIGN KEY ("prod_class_sys_id") REFERENCES "uwclass" ("class_sys_id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.product: 2 rows
/*!40000 ALTER TABLE "product" DISABLE KEYS */;
INSERT INTO "product" ("prod_sys_id", "prod_code", "prod_desc", "prod_frz_flag", "prod_class_sys_id", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(2, '1002', 'Motor Private', 'false', 1, '2024-07-22 16:29:43.972618', NULL, NULL, NULL),
	(1, '1001', 'Motor Commercial', 'false', 2, '2024-07-22 16:29:43.972618', NULL, NULL, NULL);
/*!40000 ALTER TABLE "product" ENABLE KEYS */;

-- Dumping structure for table public.productchargeassociation
DROP TABLE IF EXISTS "productchargeassociation";
CREATE TABLE IF NOT EXISTS "productchargeassociation" (
	"prod_sys_id" INTEGER NOT NULL,
	"chg_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("prod_sys_id", "chg_sys_id"),
	CONSTRAINT "productchargeassociation_chg_sys_id_fkey" FOREIGN KEY ("chg_sys_id") REFERENCES "charge" ("chg_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "productchargeassociation_prod_sys_id_fkey" FOREIGN KEY ("prod_sys_id") REFERENCES "product" ("prod_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.productchargeassociation: 6 rows
/*!40000 ALTER TABLE "productchargeassociation" DISABLE KEYS */;
INSERT INTO "productchargeassociation" ("prod_sys_id", "chg_sys_id", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(2, 1, '2024-07-22 17:05:07.590706', NULL, NULL, NULL),
	(2, 2, '2024-07-22 17:05:07.590706', NULL, NULL, NULL),
	(2, 3, '2024-07-22 17:05:07.590706', NULL, NULL, NULL),
	(1, 1, '2024-07-22 17:05:07.590706', NULL, NULL, NULL),
	(1, 2, '2024-07-22 17:05:07.590706', NULL, NULL, NULL),
	(1, 3, '2024-07-22 17:05:07.590706', NULL, NULL, NULL);
/*!40000 ALTER TABLE "productchargeassociation" ENABLE KEYS */;

-- Dumping structure for table public.productconditionassociation
DROP TABLE IF EXISTS "productconditionassociation";
CREATE TABLE IF NOT EXISTS "productconditionassociation" (
	"prod_sys_id" INTEGER NOT NULL,
	"cond_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("prod_sys_id", "cond_sys_id"),
	CONSTRAINT "productconditionassociation_cond_sys_id_fkey" FOREIGN KEY ("cond_sys_id") REFERENCES "condition" ("cond_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "productconditionassociation_prod_sys_id_fkey" FOREIGN KEY ("prod_sys_id") REFERENCES "product" ("prod_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.productconditionassociation: -1 rows
/*!40000 ALTER TABLE "productconditionassociation" DISABLE KEYS */;
/*!40000 ALTER TABLE "productconditionassociation" ENABLE KEYS */;

-- Dumping structure for table public.productsectionassociation
DROP TABLE IF EXISTS "productsectionassociation";
CREATE TABLE IF NOT EXISTS "productsectionassociation" (
	"prod_sys_id" INTEGER NOT NULL,
	"sec_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("prod_sys_id", "sec_sys_id"),
	CONSTRAINT "productsectionassociation_prod_sys_id_fkey" FOREIGN KEY ("prod_sys_id") REFERENCES "product" ("prod_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "productsectionassociation_sec_sys_id_fkey" FOREIGN KEY ("sec_sys_id") REFERENCES "section" ("sec_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.productsectionassociation: 5 rows
/*!40000 ALTER TABLE "productsectionassociation" DISABLE KEYS */;
INSERT INTO "productsectionassociation" ("prod_sys_id", "sec_sys_id", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(2, 2, '2024-07-22 17:10:56.662385', NULL, NULL, NULL),
	(2, 4, '2024-07-22 17:10:56.662385', NULL, NULL, NULL),
	(2, 3, '2024-07-22 17:10:56.662385', NULL, NULL, NULL),
	(2, 5, '2024-07-22 17:10:56.662385', NULL, NULL, NULL),
	(1, 1, '2024-07-22 17:11:16.056537', NULL, NULL, NULL);
/*!40000 ALTER TABLE "productsectionassociation" ENABLE KEYS */;

-- Dumping structure for table public.proposal
DROP TABLE IF EXISTS "proposal";
CREATE TABLE IF NOT EXISTS "proposal" (
	"prop_sys_id" SERIAL NOT NULL,
	"prop_sr_no" INTEGER NOT NULL,
	"prop_paymt_ref" VARCHAR NULL DEFAULT NULL,
	"prop_paymt_date" TIMESTAMP NULL DEFAULT NULL,
	"pol_quot_sys_id" INTEGER NULL DEFAULT NULL,
	"pol_quot_no" VARCHAR NULL DEFAULT NULL,
	"pol_comp_code" VARCHAR NOT NULL,
	"pol_divn_code" VARCHAR NOT NULL,
	"pol_dept_code" VARCHAR NULL DEFAULT NULL,
	"pol_prod_code" VARCHAR NOT NULL,
	"pol_type" VARCHAR NOT NULL,
	"pol_cust_code" VARCHAR NOT NULL,
	"pol_assr_code" VARCHAR NULL DEFAULT NULL,
	"pol_fm_dt" TIMESTAMP NOT NULL,
	"pol_to_dt" TIMESTAMP NOT NULL,
	"pol_dflt_si_curr_code" VARCHAR NOT NULL,
	"pol_prem_curr_code" VARCHAR NOT NULL,
	"pol_flexi" JSONB NULL DEFAULT NULL,
	"pol_sys_id" INTEGER NULL DEFAULT NULL,
	"pol_end_no_idx" INTEGER NULL DEFAULT NULL,
	"pol_no" VARCHAR NULL DEFAULT NULL,
	"pol_cr_dt" TIMESTAMP NULL DEFAULT NULL,
	"pol_appr_dt" TIMESTAMP NULL DEFAULT NULL,
	"pol_sts" VARCHAR NULL DEFAULT NULL,
	"prop_quot_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("prop_sys_id"),
	INDEX "ix_proposal_prop_sys_id" ("prop_sys_id"),
	CONSTRAINT "proposal_prop_quot_sys_id_fkey" FOREIGN KEY ("prop_quot_sys_id") REFERENCES "quote" ("quot_sys_id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.proposal: -1 rows
/*!40000 ALTER TABLE "proposal" DISABLE KEYS */;
/*!40000 ALTER TABLE "proposal" ENABLE KEYS */;

-- Dumping structure for table public.proposalcharge
DROP TABLE IF EXISTS "proposalcharge";
CREATE TABLE IF NOT EXISTS "proposalcharge" (
	"chg_sys_id" SERIAL NOT NULL,
	"chg_sr_no" INTEGER NOT NULL,
	"pchg_code" VARCHAR NOT NULL,
	"pchg_type" VARCHAR NOT NULL,
	"pchg_perc" DOUBLE PRECISION NULL DEFAULT NULL,
	"pchg_chg_fc" DOUBLE PRECISION NULL DEFAULT NULL,
	"pchg_prem_curr_code" VARCHAR NOT NULL,
	"pchg_rate_per" DOUBLE PRECISION NULL DEFAULT NULL,
	"pchg_flexi" JSONB NULL DEFAULT NULL,
	"pchg_sys_id" INTEGER NULL DEFAULT NULL,
	"pchg_pol_sys_id" INTEGER NULL DEFAULT NULL,
	"pchg_end_no_idx" INTEGER NULL DEFAULT NULL,
	"chg_prop_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("chg_sys_id"),
	INDEX "ix_proposalcharge_chg_sys_id" ("chg_sys_id"),
	CONSTRAINT "proposalcharge_chg_prop_sys_id_fkey" FOREIGN KEY ("chg_prop_sys_id") REFERENCES "proposal" ("prop_sys_id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.proposalcharge: -1 rows
/*!40000 ALTER TABLE "proposalcharge" DISABLE KEYS */;
/*!40000 ALTER TABLE "proposalcharge" ENABLE KEYS */;

-- Dumping structure for table public.proposalcover
DROP TABLE IF EXISTS "proposalcover";
CREATE TABLE IF NOT EXISTS "proposalcover" (
	"cvr_sys_id" SERIAL NOT NULL,
	"cvr_sr_no" INTEGER NOT NULL,
	"prc_code" VARCHAR NOT NULL,
	"prc_rate" DOUBLE PRECISION NULL DEFAULT NULL,
	"prc_rate_per" DOUBLE PRECISION NULL DEFAULT NULL,
	"prc_si_curr_code" VARCHAR NOT NULL,
	"prc_prem_curr_code" VARCHAR NOT NULL,
	"prc_si_fc" DOUBLE PRECISION NULL DEFAULT NULL,
	"prc_prem_fc" DOUBLE PRECISION NULL DEFAULT NULL,
	"prc_flexi" JSONB NULL DEFAULT NULL,
	"prc_sys_id" INTEGER NULL DEFAULT NULL,
	"prc_sr_no" INTEGER NULL DEFAULT NULL,
	"prc_lvl1_sys_id" INTEGER NULL DEFAULT NULL,
	"prc_pol_sys_id" INTEGER NULL DEFAULT NULL,
	"prc_end_no_idx" INTEGER NULL DEFAULT NULL,
	"cvr_risk_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("cvr_sys_id"),
	INDEX "ix_proposalcover_cvr_sys_id" ("cvr_sys_id"),
	CONSTRAINT "proposalcover_cvr_risk_sys_id_fkey" FOREIGN KEY ("cvr_risk_sys_id") REFERENCES "proposalrisk" ("risk_sys_id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.proposalcover: -1 rows
/*!40000 ALTER TABLE "proposalcover" DISABLE KEYS */;
/*!40000 ALTER TABLE "proposalcover" ENABLE KEYS */;

-- Dumping structure for table public.proposalrisk
DROP TABLE IF EXISTS "proposalrisk";
CREATE TABLE IF NOT EXISTS "proposalrisk" (
	"risk_sys_id" SERIAL NOT NULL,
	"risk_sr_no" INTEGER NOT NULL,
	"prai_data_18" VARCHAR NULL DEFAULT NULL,
	"prai_code_03" VARCHAR NULL DEFAULT NULL,
	"prai_desc_09" VARCHAR NULL DEFAULT NULL,
	"prai_flexi" JSONB NULL DEFAULT NULL,
	"prai_sys_id" INTEGER NULL DEFAULT NULL,
	"prai_risk_lvl_no" INTEGER NULL DEFAULT NULL,
	"prai_risk_id" INTEGER NULL DEFAULT NULL,
	"prai_pol_sys_id" INTEGER NULL DEFAULT NULL,
	"prai_end_no_idx" INTEGER NULL DEFAULT NULL,
	"risk_sec_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("risk_sys_id"),
	INDEX "ix_proposalrisk_risk_sys_id" ("risk_sys_id"),
	CONSTRAINT "proposalrisk_risk_sec_sys_id_fkey" FOREIGN KEY ("risk_sec_sys_id") REFERENCES "proposalsection" ("sec_sys_id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.proposalrisk: -1 rows
/*!40000 ALTER TABLE "proposalrisk" DISABLE KEYS */;
/*!40000 ALTER TABLE "proposalrisk" ENABLE KEYS */;

-- Dumping structure for table public.proposalsection
DROP TABLE IF EXISTS "proposalsection";
CREATE TABLE IF NOT EXISTS "proposalsection" (
	"sec_sys_id" SERIAL NOT NULL,
	"sec_sr_no" INTEGER NOT NULL,
	"psec_sec_code" VARCHAR NOT NULL,
	"psec_flexi" JSONB NULL DEFAULT NULL,
	"psec_sys_id" INTEGER NULL DEFAULT NULL,
	"psec_pol_sys_id" INTEGER NULL DEFAULT NULL,
	"psec_end_no_idx" INTEGER NULL DEFAULT NULL,
	"sec_prop_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("sec_sys_id"),
	INDEX "ix_proposalsection_sec_sys_id" ("sec_sys_id"),
	CONSTRAINT "proposalsection_sec_prop_sys_id_fkey" FOREIGN KEY ("sec_prop_sys_id") REFERENCES "proposal" ("prop_sys_id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.proposalsection: -1 rows
/*!40000 ALTER TABLE "proposalsection" DISABLE KEYS */;
/*!40000 ALTER TABLE "proposalsection" ENABLE KEYS */;

-- Dumping structure for table public.proposalsmi
DROP TABLE IF EXISTS "proposalsmi";
CREATE TABLE IF NOT EXISTS "proposalsmi" (
	"smi_sys_id" SERIAL NOT NULL,
	"smi_sr_no" INTEGER NOT NULL,
	"prs_smi_code" VARCHAR NOT NULL,
	"prs_rate" DOUBLE PRECISION NULL DEFAULT NULL,
	"prs_rate_per" DOUBLE PRECISION NULL DEFAULT NULL,
	"prs_si_fc" DOUBLE PRECISION NULL DEFAULT NULL,
	"prs_prem_fc" DOUBLE PRECISION NULL DEFAULT NULL,
	"prs_smi_desc" VARCHAR NULL DEFAULT NULL,
	"prs_flexi" JSONB NULL DEFAULT NULL,
	"prs_sys_id" INTEGER NULL DEFAULT NULL,
	"prs_lvl1_sys_id" INTEGER NULL DEFAULT NULL,
	"prs_pol_sys_id" INTEGER NULL DEFAULT NULL,
	"prs_end_no_idx" INTEGER NULL DEFAULT NULL,
	"prs_psec_sys_id" INTEGER NULL DEFAULT NULL,
	"smi_risk_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("smi_sys_id"),
	INDEX "ix_proposalsmi_smi_sys_id" ("smi_sys_id"),
	CONSTRAINT "proposalsmi_smi_risk_sys_id_fkey" FOREIGN KEY ("smi_risk_sys_id") REFERENCES "proposalrisk" ("risk_sys_id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.proposalsmi: -1 rows
/*!40000 ALTER TABLE "proposalsmi" DISABLE KEYS */;
/*!40000 ALTER TABLE "proposalsmi" ENABLE KEYS */;

-- Dumping structure for table public.quote
DROP TABLE IF EXISTS "quote";
CREATE TABLE IF NOT EXISTS "quote" (
	"quot_sys_id" SERIAL NOT NULL,
	"quot_ref" VARCHAR NOT NULL,
	"quot_assr_id" INTEGER NULL DEFAULT NULL,
	"quot_assr_name" VARCHAR NULL DEFAULT NULL,
	"quot_assr_nic" VARCHAR NULL DEFAULT NULL,
	"quot_assr_pin" VARCHAR NULL DEFAULT NULL,
	"quot_assr_phone" VARCHAR NULL DEFAULT NULL,
	"quot_assr_email" VARCHAR NULL DEFAULT NULL,
	"quot_paymt_ref" VARCHAR NULL DEFAULT NULL,
	"quot_paymt_date" TIMESTAMPTZ NULL DEFAULT NULL,
	"quot_payload" JSONB NULL DEFAULT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("quot_sys_id"),
	INDEX "ix_quote_quot_ref" ("quot_ref"),
	INDEX "ix_quote_quot_sys_id" ("quot_sys_id")
);

-- Dumping data for table public.quote: -1 rows
/*!40000 ALTER TABLE "quote" DISABLE KEYS */;
/*!40000 ALTER TABLE "quote" ENABLE KEYS */;

-- Dumping structure for table public.section
DROP TABLE IF EXISTS "section";
CREATE TABLE IF NOT EXISTS "section" (
	"sec_sys_id" SERIAL NOT NULL,
	"sec_code" VARCHAR NOT NULL,
	"sec_desc" VARCHAR NOT NULL,
	"sec_frz_flag" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("sec_sys_id"),
	INDEX "ix_section_sec_code" ("sec_code"),
	INDEX "ix_section_sec_desc" ("sec_desc"),
	INDEX "ix_section_sec_sys_id" ("sec_sys_id")
);

-- Dumping data for table public.section: 5 rows
/*!40000 ALTER TABLE "section" DISABLE KEYS */;
INSERT INTO "section" ("sec_sys_id", "sec_code", "sec_desc", "sec_frz_flag", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, '100101', 'Motor Commercial', 'false', '2024-07-22 16:49:36.968764', NULL, NULL, NULL),
	(2, '100201', 'Motor Private', 'false', '2024-07-22 16:49:36.968764', NULL, NULL, NULL),
	(3, '100204', 'JUBILEE 24/7', 'false', '2024-07-22 16:49:36.968764', NULL, NULL, NULL),
	(4, '100203', 'Lady Jubilee', 'false', '2024-07-22 16:49:36.968764', NULL, NULL, NULL),
	(5, '100209', 'Prime Auto', 'false', '2024-07-22 16:49:36.968764', NULL, NULL, NULL);
/*!40000 ALTER TABLE "section" ENABLE KEYS */;

-- Dumping structure for table public.sectioncoverassociation
DROP TABLE IF EXISTS "sectioncoverassociation";
CREATE TABLE IF NOT EXISTS "sectioncoverassociation" (
	"sec_sys_id" INTEGER NOT NULL,
	"cvr_sys_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("sec_sys_id", "cvr_sys_id"),
	CONSTRAINT "sectioncoverassociation_cvr_sys_id_fkey" FOREIGN KEY ("cvr_sys_id") REFERENCES "cover" ("cvr_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "sectioncoverassociation_sec_sys_id_fkey" FOREIGN KEY ("sec_sys_id") REFERENCES "section" ("sec_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.sectioncoverassociation: 45 rows
/*!40000 ALTER TABLE "sectioncoverassociation" DISABLE KEYS */;
INSERT INTO "sectioncoverassociation" ("sec_sys_id", "cvr_sys_id", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, 1, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 2, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 3, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 4, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 5, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 7, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 9, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 10, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(1, 11, '2024-07-22 17:27:22.053736', NULL, NULL, NULL),
	(2, 1, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 1, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 1, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 1, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 2, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 2, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 2, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 2, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 3, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 3, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 3, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 3, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 4, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 4, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 4, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 4, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 5, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 5, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 5, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 5, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 7, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 7, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 7, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 7, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 8, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 8, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 8, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 8, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 9, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 9, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 9, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 9, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(2, 10, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(3, 10, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(4, 10, '2024-07-22 17:28:15.930034', NULL, NULL, NULL),
	(5, 10, '2024-07-22 17:28:15.930034', NULL, NULL, NULL);
/*!40000 ALTER TABLE "sectioncoverassociation" ENABLE KEYS */;

-- Dumping structure for table public.stringattribute
DROP TABLE IF EXISTS "stringattribute";
CREATE TABLE IF NOT EXISTS "stringattribute" (
	"str_attr_sys_id" SERIAL NOT NULL,
	"entity_type" VARCHAR NOT NULL,
	"entity_id" INTEGER NOT NULL,
	"attr_sys_id" INTEGER NOT NULL,
	"value" VARCHAR NULL DEFAULT NULL,
	"value_code" VARCHAR NULL DEFAULT NULL,
	"parent_str_attr_sys_id" INTEGER NULL DEFAULT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	UNIQUE INDEX "stringattribute_entity_type_entity_id_attr_sys_id_value_parent_" ("entity_type", "entity_id", "attr_sys_id", "value", "parent_str_attr_sys_id"),
	PRIMARY KEY ("str_attr_sys_id"),
	INDEX "ix_stringattribute_str_attr_sys_id" ("str_attr_sys_id"),
	CONSTRAINT "stringattribute_attr_sys_id_fkey" FOREIGN KEY ("attr_sys_id") REFERENCES "attributedefinition" ("attr_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "stringattribute_parent_str_attr_sys_id_fkey" FOREIGN KEY ("parent_str_attr_sys_id") REFERENCES "stringattribute" ("str_attr_sys_id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.stringattribute: 985 rows
/*!40000 ALTER TABLE "stringattribute" DISABLE KEYS */;
INSERT INTO "stringattribute" ("str_attr_sys_id", "entity_type", "entity_id", "attr_sys_id", "value", "value_code", "parent_str_attr_sys_id", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(241, 'Product', 1, 6, 'SINGLE CAB', 'A015001', 89, '2024-07-25 15:05:22.675564', NULL, NULL, NULL),
	(242, 'Product', 1, 6, 'AKERMAN', 'A002001', 90, '2024-07-25 15:05:22.696397', NULL, NULL, NULL),
	(243, 'Product', 1, 6, 'GIULIETTA', 'G0021228', 91, '2024-07-25 15:05:22.702502', NULL, NULL, NULL),
	(244, 'Product', 1, 6, '1600', '10020607', 91, '2024-07-25 15:05:22.708881', NULL, NULL, NULL),
	(245, 'Product', 1, 6, '1750', '10020096', 91, '2024-07-25 15:05:22.715', NULL, NULL, NULL),
	(1, 'Product', 2, 1, 'Motor Private', '1002', NULL, '2024-07-25 12:09:27.502312', NULL, NULL, NULL),
	(2, 'Product', 2, 1, 'Lady Jubilee', '1002-01', NULL, '2024-07-25 12:14:52.687714', NULL, NULL, NULL),
	(3, 'Product', 2, 1, 'JUBILEE 24/7', '1002-02', NULL, '2024-07-25 12:14:52.707233', NULL, NULL, NULL),
	(4, 'Product', 2, 1, 'Prime Auto', '1002-03', NULL, '2024-07-25 12:14:52.713907', NULL, NULL, NULL),
	(5, 'Product', 1, 1, 'Motor Commercial', '1001', NULL, '2024-07-25 12:16:55.809793', NULL, NULL, NULL),
	(246, 'Product', 1, 6, 'ALFA ROMEO', 'A003001', 91, '2024-07-25 15:05:22.722407', NULL, NULL, NULL),
	(247, 'Product', 1, 6, '2000', '20020098', 91, '2024-07-25 15:05:22.727344', NULL, NULL, NULL),
	(248, 'Product', 1, 6, '156', '10020835', 91, '2024-07-25 15:05:22.732856', NULL, NULL, NULL),
	(249, 'Product', 1, 6, 'AMW 2518TP', 'A015003', 92, '2024-07-25 15:05:22.738721', NULL, NULL, NULL),
	(250, 'Product', 1, 6, 'ARTIC', 'A004001', 93, '2024-07-25 15:05:22.746704', NULL, NULL, NULL),
	(251, 'Product', 1, 6, 'ASCODA', 'A005001', 94, '2024-07-25 15:05:22.753143', NULL, NULL, NULL),
	(252, 'Product', 1, 6, 'ASHOK', 'A006001', 95, '2024-07-25 15:05:22.760415', NULL, NULL, NULL),
	(253, 'Product', 1, 6, 'LEYLAND', 'A006002', 95, '2024-07-25 15:05:22.76654', NULL, NULL, NULL),
	(254, 'Product', 1, 6, 'ISUZU', 'I003002', 95, '2024-07-25 15:05:22.771936', NULL, NULL, NULL),
	(255, 'Product', 1, 6, 'ASTRA', 'A014001', 96, '2024-07-25 15:05:22.780565', NULL, NULL, NULL),
	(6, 'Product', 1, 2, 'Comprehensive', '01', NULL, '2024-07-25 12:26:38.914516', NULL, NULL, NULL),
	(7, 'Product', 1, 2, 'Third Party Fire And Theft', '02', NULL, '2024-07-25 12:26:45.676769', NULL, NULL, NULL),
	(8, 'Product', 1, 2, 'Third Party Only', '03', NULL, '2024-07-25 12:26:47.930768', NULL, NULL, NULL),
	(9, 'Product', 2, 2, 'Comprehensive', '01', NULL, '2024-07-25 12:26:50.403583', NULL, NULL, NULL),
	(256, 'Product', 1, 6, 'Q3', 'Q0020843', 97, '2024-07-25 15:05:22.785566', NULL, NULL, NULL),
	(257, 'Product', 1, 6, 'AUDI', 'A009001', 97, '2024-07-25 15:05:22.791277', NULL, NULL, NULL),
	(11, 'Product', 2, 2, 'Third Party Only', '03', NULL, '2024-07-25 12:29:04.462171', NULL, NULL, NULL),
	(10, 'Product', 2, 2, 'Third Party Fire And Theft', '02', NULL, '2024-07-25 12:26:53.573004', NULL, NULL, NULL),
	(36, 'Product', 1, 4, 'MOTOR CYCLE-FOUR  WHEELER', '048', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(37, 'Product', 1, 4, 'SPECIAL PURPOSE', '804', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(38, 'Product', 1, 4, 'EXCAVATOR', '801', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(39, 'Product', 1, 4, 'MIXER', '800', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(40, 'Product', 1, 4, 'SALOON', '001', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(41, 'Product', 1, 4, 'SEDAN', '002', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(42, 'Product', 1, 4, 'VAN', '003', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(43, 'Product', 1, 4, 'DOUBLE CAB', '004', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(44, 'Product', 1, 4, 'STATION WAGON', '005', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(45, 'Product', 1, 4, 'OPEN PICKUP', '006', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(46, 'Product', 1, 4, 'TRACTOR', '007', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(47, 'Product', 1, 4, 'TRUCK', '008', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(48, 'Product', 1, 4, 'MINI VAN', '009', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(49, 'Product', 1, 4, 'EARTHMOVER', '010', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(50, 'Product', 1, 4, 'CRANE', '011', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(51, 'Product', 1, 4, 'HIGH SIDED BODY', '012', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(52, 'Product', 1, 4, 'PRIME MOVER', '013', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(53, 'Product', 1, 4, 'FORKLIFT', '014', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(54, 'Product', 1, 4, 'GRADER', '015', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(55, 'Product', 1, 4, 'TRAILER/HAULERS', '016', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(56, 'Product', 1, 4, 'TANKER', '017', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(57, 'Product', 1, 4, 'LORRY', '018', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(58, 'Product', 1, 4, 'BUS', '019', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(59, 'Product', 1, 4, 'PICKUP', '020', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(60, 'Product', 1, 4, 'CANTER', '021', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(61, 'Product', 1, 4, 'TUK TUK', '022', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(62, 'Product', 1, 4, 'TIPPER', '023', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(63, 'Product', 1, 4, 'WHEELLOADER', '025', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(64, 'Product', 1, 4, 'MOTOR CYCLE-TWO WHEELER', '027', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(65, 'Product', 1, 4, 'MOTOR CYCLE-THREE WHEELER', '029', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(66, 'Product', 1, 4, 'PETROL TANKER', '031', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(67, 'Product', 1, 4, 'GAS TANKER', '032', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(68, 'Product', 1, 4, 'CHEMICAL TANKER', '033', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(69, 'Product', 1, 4, 'PSV-MINIBUS', '034', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(70, 'Product', 1, 4, 'PSV-TAXI', '035', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(71, 'Product', 1, 4, 'PSV-COASTER and BUS', '036', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(72, 'Product', 1, 4, 'PMO/CORPORATE and SCHOOL BUS', '037', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(73, 'Product', 1, 4, 'DRIVING SCHOOL', '038', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(74, 'Product', 1, 4, 'AMBULANCE', '039', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(75, 'Product', 1, 4, 'HEARSES', '040', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(76, 'Product', 1, 4, 'BULLION VANS', '041', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(77, 'Product', 1, 4, 'FIRE FIGHTING VEHICLES', '042', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(78, 'Product', 1, 4, 'FARM VEHICLES', '043', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(258, 'Product', 1, 6, 'A7', 'A0021598', 97, '2024-07-25 15:05:22.796405', NULL, NULL, NULL),
	(259, 'Product', 1, 6, '80', 'A009003', 97, '2024-07-25 15:05:22.809512', NULL, NULL, NULL),
	(260, 'Product', 1, 6, 'A4', 'A009004', 97, '2024-07-25 15:05:22.814971', NULL, NULL, NULL),
	(18, 'Product', 1, 3, 'BUS - SCHOOL', '019', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(19, 'Product', 1, 3, 'LOCAL TRAILER', '022', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(20, 'Product', 1, 3, 'INSTITUTIONAL VEHICLES(CHURCH/SCHOOL/STAFF BUSES/VANS)', '008', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(22, 'Product', 1, 3, 'JUBILEE SMART TRADER', '025', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(23, 'Product', 1, 3, 'SPECIAL VEHICLES - AMBULANCE & FIRE FIGHTERS', '024', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(24, 'Product', 1, 3, 'PSV - MOTOR ASSET', '001', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(25, 'Product', 1, 3, 'OWN GOODS', '002', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(26, 'Product', 1, 3, 'MOTOR TRADE - ROAD RISKS', '004', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(27, 'Product', 1, 3, 'GENERAL CARTAGE', '006', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(28, 'Product', 1, 3, 'DRIVING SCHOOLS VEHICLES', '007', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(29, 'Product', 1, 3, 'SPECIAL VEHICLES -AGRICULTURAL AND FORESTRY(TRACTORS, HARVESTERS ETC)', '009', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(30, 'Product', 1, 3, 'PETROLEUM TANKERS', '010', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(31, 'Product', 1, 3, 'PUBLIC SERVICE VEHICLES', '012', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(32, 'Product', 1, 3, 'PSV TAXI (UBER ONLY)', '013', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(33, 'Product', 1, 3, 'TOUR OPERATORS', '015', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(34, 'Product', 1, 3, 'BUS - PRIVATE', '018', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(35, 'Product', 1, 3, 'STEEL OIL TANKER', '020', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(79, 'Product', 1, 4, 'MOTOR RECOVERY VEHICLES', '044', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(80, 'Product', 1, 4, 'RRMP_CONSTRUCTION VEHICLE', '045', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(81, 'Product', 1, 4, 'MOTOR TRADE RISK', '046', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(82, 'Product', 1, 4, 'JB-BODY', '7254', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(83, 'Product', 1, 4, 'HATCHBACK', '047', NULL, '2024-07-25 13:27:22.769045', NULL, NULL, NULL),
	(84, 'Product', 2, 4, 'SALOON', '001', NULL, '2024-07-25 13:37:16.364167', NULL, NULL, NULL),
	(85, 'Product', 2, 4, 'SEDAN', '002', NULL, '2024-07-25 13:37:16.364167', NULL, NULL, NULL),
	(86, 'Product', 2, 4, 'VAN', '003', NULL, '2024-07-25 13:37:16.364167', NULL, NULL, NULL),
	(87, 'Product', 2, 4, 'DOUBLE CAB', '004', NULL, '2024-07-25 13:37:16.364167', NULL, NULL, NULL),
	(88, 'Product', 2, 4, 'HATCHBACK', '047', NULL, '2024-07-25 13:37:16.364167', NULL, NULL, NULL),
	(89, 'Product', 1, 5, 'ADMIRAL  SINGLE CAB', 'A015', NULL, '2024-07-25 14:02:11.588081', NULL, NULL, NULL),
	(90, 'Product', 1, 5, 'AKERMAN', 'A002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(91, 'Product', 1, 5, 'ALFA ROMEO', 'A003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(92, 'Product', 1, 5, 'AMW', 'A018', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(93, 'Product', 1, 5, 'ARTIC', 'A004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(94, 'Product', 1, 5, 'ASCODA', 'A005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(95, 'Product', 1, 5, 'ASHOK', 'A006', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(96, 'Product', 1, 5, 'ASTRA', 'A014', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(97, 'Product', 1, 5, 'AUDI', 'A009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(98, 'Product', 1, 5, 'AUSTIN', 'A010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(99, 'Product', 1, 5, 'AXLE', 'A011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(100, 'Product', 1, 5, 'B.M.W.', 'B001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(101, 'Product', 1, 5, 'BAJAJ', 'B002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(102, 'Product', 1, 5, 'BALENO', 'B003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(103, 'Product', 1, 5, 'BEDFORD', 'B004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(104, 'Product', 1, 5, 'BEI BEN', 'Z011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(105, 'Product', 1, 5, 'BEIBEN', 'B251', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(106, 'Product', 1, 5, 'BEIFANG', 'B005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(107, 'Product', 1, 5, 'BELL LOGGER', 'B007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(108, 'Product', 1, 5, 'BHACHU', 'B008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(109, 'Product', 1, 5, 'BOMAG', 'BG0001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(110, 'Product', 1, 5, 'BUICK', 'B010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(111, 'Product', 1, 5, 'BURNS & BLANE', 'B011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(112, 'Product', 1, 5, 'BYD', 'BY251', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(113, 'Product', 1, 5, 'CAM', 'CAM01', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(114, 'Product', 1, 5, 'CASE', 'CS0001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(115, 'Product', 1, 5, 'CASE INTERNATIONAL', 'C004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(116, 'Product', 1, 5, 'CATERPILLAR', 'C005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(117, 'Product', 1, 5, 'CF MOTO', 'C020', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(118, 'Product', 1, 5, 'CHERY', 'CO19', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(119, 'Product', 1, 5, 'CHEVROLET', 'C007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(120, 'Product', 1, 5, 'CHRYSLER', 'C008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(121, 'Product', 1, 5, 'CITREON', 'C009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(122, 'Product', 1, 5, 'CLASS', 'C010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(123, 'Product', 1, 5, 'CMC', 'C011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(124, 'Product', 1, 5, 'CRANE', 'C017', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(125, 'Product', 1, 5, 'DAF', 'D003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(126, 'Product', 1, 5, 'DAIHATSU', 'D004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(127, 'Product', 1, 5, 'DATSUN', 'D006', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(128, 'Product', 1, 5, 'DAYUN', 'D007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(129, 'Product', 1, 5, 'DEFENDER', 'D008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(130, 'Product', 1, 5, 'DEUTZ', 'D009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(131, 'Product', 1, 5, 'DFSK', 'D021', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(132, 'Product', 1, 5, 'DISCOVERY', 'D011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(133, 'Product', 1, 5, 'DODGE', 'D012', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(134, 'Product', 1, 5, 'DOLL', 'D20', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(135, 'Product', 1, 5, 'Dongfeng', 'D022', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(136, 'Product', 1, 5, 'DUMP', 'D015', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(137, 'Product', 1, 5, 'EICHER', 'E001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(138, 'Product', 1, 5, 'FAW', 'F002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(139, 'Product', 1, 5, 'FIAT', 'F004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(140, 'Product', 1, 5, 'FLATBED', 'F006', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(141, 'Product', 1, 5, 'FORD', 'F008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(142, 'Product', 1, 5, 'FORKLIFT', 'F009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(143, 'Product', 1, 5, 'FOTON', 'F010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(144, 'Product', 1, 5, 'GOLF', 'G004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(145, 'Product', 1, 5, 'GREATWALL', 'G006', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(146, 'Product', 1, 5, 'HARBEN', '1000', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(147, 'Product', 1, 5, 'HARDLEY', 'H004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(148, 'Product', 1, 5, 'HATCH', 'H005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(149, 'Product', 1, 5, 'HINO', 'H009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(150, 'Product', 1, 5, 'HITACHI', 'H20', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(151, 'Product', 1, 5, 'HONDA', 'H010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(152, 'Product', 1, 5, 'HOWO', 'H21', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(153, 'Product', 1, 5, 'HUMMER', 'H013', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(154, 'Product', 1, 5, 'HYOUNG TRAILER', 'H001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(155, 'Product', 1, 5, 'HYSTER', 'H015', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(156, 'Product', 1, 5, 'HYUNDAI', 'H016', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(157, 'Product', 1, 5, 'INFINITI', 'I044', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(158, 'Product', 1, 5, 'INTERNATIONAL', 'I002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(159, 'Product', 1, 5, 'ISUZU', 'I003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(160, 'Product', 1, 5, 'IVECO', 'I005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(161, 'Product', 1, 5, 'J.C.B', 'J001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(162, 'Product', 1, 5, 'JAC', 'J009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(163, 'Product', 1, 5, 'JAGUAR', 'J002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(164, 'Product', 1, 5, 'JEEP', 'J005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(165, 'Product', 1, 5, 'JINCHENG', 'J008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(166, 'Product', 1, 5, 'JOHN', 'J007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(167, 'Product', 1, 5, 'KG PLATE', 'K007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(168, 'Product', 1, 5, 'KIA', 'K002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(169, 'Product', 1, 5, 'KIBO', '12300', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(170, 'Product', 1, 5, 'KOMATSU', 'K005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(171, 'Product', 1, 5, 'KORANDO', 'K006', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(172, 'Product', 1, 5, 'LAE', 'L003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(173, 'Product', 1, 5, 'LAND CRUISER', 'T018', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(174, 'Product', 1, 5, 'LANDINI', 'L004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(175, 'Product', 1, 5, 'LANDROVER', 'L001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(176, 'Product', 1, 5, 'LEXUS', 'L007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(177, 'Product', 1, 5, 'LEYLAND', 'L002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(178, 'Product', 1, 5, 'M/F', 'M001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(179, 'Product', 1, 5, 'MAHINDRA', 'M003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(180, 'Product', 1, 5, 'MAN', 'M004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(181, 'Product', 1, 5, 'MANTI', 'M005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(182, 'Product', 1, 5, 'MARUTI', 'M006', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(183, 'Product', 1, 5, 'MASSEY', 'M008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(184, 'Product', 1, 5, 'MAZDA', 'M009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(185, 'Product', 1, 5, 'MERCEDES', 'M010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(186, 'Product', 1, 5, 'MGB', 'M011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(187, 'Product', 1, 5, 'MINI', 'M012', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(188, 'Product', 1, 5, 'MITSUBISHI', 'M014', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(189, 'Product', 1, 5, 'MOBIUS', 'MOBIUS', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(190, 'Product', 1, 5, 'MORRIS', 'M016', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(191, 'Product', 1, 5, 'MUSSO', 'M018', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(192, 'Product', 1, 5, 'NETA', '1101', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(193, 'Product', 1, 5, 'NEW', 'N002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(194, 'Product', 1, 5, 'NISSAN', 'N003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(195, 'Product', 1, 5, 'NOT', 'N005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(196, 'Product', 1, 5, 'OPEL', 'O005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(197, 'Product', 1, 5, 'Others', '999', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(198, 'Product', 1, 5, 'PAJERO', 'M019', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(199, 'Product', 1, 5, 'PEUGEOT', 'P003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(200, 'Product', 1, 5, 'PIAGGIO', 'P004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(201, 'Product', 1, 5, 'POLARIS', 'P047', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(202, 'Product', 1, 5, 'PORSCHE', 'P009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(203, 'Product', 1, 5, 'PREMIUM', 'P011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(204, 'Product', 1, 5, 'PRONTO', 'P013', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(205, 'Product', 1, 5, 'PROTON', 'P012', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(206, 'Product', 1, 5, 'RANDOM', 'R001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(207, 'Product', 1, 5, 'RANGE', 'R002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(208, 'Product', 1, 5, 'RANGER', 'R008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(209, 'Product', 1, 5, 'RENAULT', 'R004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(210, 'Product', 1, 5, 'SAME', 'S003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(211, 'Product', 1, 5, 'SANAYI', 'S005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(212, 'Product', 1, 5, 'SCANIA', 'S006', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(213, 'Product', 1, 5, 'SCODA', 'S007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(214, 'Product', 1, 5, 'SHACMAN', 'S023', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(215, 'Product', 1, 5, 'SHANTUI', 'S010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(216, 'Product', 1, 5, 'SHINERAY', 'S041', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(217, 'Product', 1, 5, 'SINOTRUCK', 'S022', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(218, 'Product', 1, 5, 'SKODA', 'S016', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(219, 'Product', 1, 5, 'SKYGO', 'Z007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(220, 'Product', 1, 5, 'SSANGYONG', 'S017', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(221, 'Product', 1, 5, 'SUBARU', 'S019', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(222, 'Product', 1, 5, 'SUZUKI', 'S020', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(223, 'Product', 1, 5, 'TANKER', 'T003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(224, 'Product', 1, 5, 'TATA', 'T004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(225, 'Product', 1, 5, 'TIGER', 'T007', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(226, 'Product', 1, 5, 'TIPPER', 'T008', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(227, 'Product', 1, 5, 'TO BE ADVISED', 'T017', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(228, 'Product', 1, 5, 'TOYOTA', 'T009', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(229, 'Product', 1, 5, 'TRACTOR', 'T010', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(230, 'Product', 1, 5, 'TRAILER', 'T011', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(231, 'Product', 1, 5, 'TRAIN', 'T012', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(232, 'Product', 1, 5, 'TRUCK', 'T015', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(233, 'Product', 1, 5, 'TVS', 'T016', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(234, 'Product', 1, 5, 'VAUXHALL', 'V001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(235, 'Product', 1, 5, 'VOLKSWAGEN', 'V004', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(236, 'Product', 1, 5, 'VOLVO', 'V005', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(237, 'Product', 1, 5, 'WRANGLER', 'W002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(238, 'Product', 1, 5, 'YAMAHA', 'Y002', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(239, 'Product', 1, 5, 'YORK', 'Y003', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(240, 'Product', 1, 5, 'ZUSUKI', 'Z001', NULL, '2024-07-25 14:02:23.275864', NULL, NULL, NULL),
	(261, 'Product', 1, 6, 'Q8', 'Q0020107', 97, '2024-07-25 15:05:22.821369', NULL, NULL, NULL),
	(262, 'Product', 1, 6, 'A3', 'A0020105', 97, '2024-07-25 15:05:22.827286', NULL, NULL, NULL),
	(263, 'Product', 1, 6, 'A5', 'A0020611', 97, '2024-07-25 15:05:22.83148', NULL, NULL, NULL),
	(264, 'Product', 1, 6, '4000', '40020103', 97, '2024-07-25 15:05:22.836184', NULL, NULL, NULL),
	(265, 'Product', 1, 6, 'SQ5', 'S0021599', 97, '2024-07-25 15:05:22.842759', NULL, NULL, NULL),
	(266, 'Product', 1, 6, 'ALLROAD', 'A0021094', 97, '2024-07-25 15:05:22.847106', NULL, NULL, NULL),
	(267, 'Product', 1, 6, 'A6', 'A0020106', 97, '2024-07-25 15:05:22.851886', NULL, NULL, NULL),
	(268, 'Product', 1, 6, 'Q5', 'Q0021233', 97, '2024-07-25 15:05:22.857069', NULL, NULL, NULL),
	(269, 'Product', 1, 6, 'Q7', 'A009006', 97, '2024-07-25 15:05:22.862512', NULL, NULL, NULL),
	(270, 'Product', 1, 6, 'ROVER', 'A010001', 98, '2024-07-25 15:05:22.86719', NULL, NULL, NULL),
	(271, 'Product', 1, 6, 'AXLE', 'A011001', 99, '2024-07-25 15:05:22.872895', NULL, NULL, NULL),
	(272, 'Product', 1, 6, 'X5', 'X0021111', 100, '2024-07-25 15:05:22.878206', NULL, NULL, NULL),
	(273, 'Product', 1, 6, '320 I', 'B001004', 100, '2024-07-25 15:05:22.883404', NULL, NULL, NULL),
	(274, 'Product', 1, 6, '325I', '30021349', 100, '2024-07-25 15:05:22.888717', NULL, NULL, NULL),
	(275, 'Product', 1, 6, '535I', '50020618', 100, '2024-07-25 15:05:22.894319', NULL, NULL, NULL),
	(276, 'Product', 1, 6, '1 SERIES', '10021229', 100, '2024-07-25 15:05:22.899461', NULL, NULL, NULL),
	(277, 'Product', 1, 6, 'X3', 'X0021744', 100, '2024-07-25 15:05:22.904388', NULL, NULL, NULL),
	(278, 'Product', 1, 6, '320', 'B001003', 100, '2024-07-25 15:05:22.909801', NULL, NULL, NULL),
	(279, 'Product', 1, 6, '320I', '30021870', 100, '2024-07-25 15:05:22.916301', NULL, NULL, NULL),
	(280, 'Product', 1, 6, 'BMW', 'B001032', 100, '2024-07-25 15:05:22.921434', NULL, NULL, NULL),
	(281, 'Product', 1, 6, '535 I', 'B001017', 100, '2024-07-25 15:05:22.926518', NULL, NULL, NULL),
	(282, 'Product', 1, 6, '116I', '10020616', 100, '2024-07-25 15:05:22.931629', NULL, NULL, NULL),
	(283, 'Product', 1, 6, '318', 'B001002', 100, '2024-07-25 15:05:22.936285', NULL, NULL, NULL),
	(284, 'Product', 1, 6, '3 SERIES', '30021869', 100, '2024-07-25 15:05:22.941489', NULL, NULL, NULL),
	(285, 'Product', 1, 6, '520 I', 'B001011', 100, '2024-07-25 15:05:22.946601', NULL, NULL, NULL),
	(286, 'Product', 1, 6, 'MOTOR-CYCLE', 'B001031', 100, '2024-07-25 15:05:22.951255', NULL, NULL, NULL),
	(287, 'Product', 1, 6, '328 IA', 'B001008', 100, '2024-07-25 15:05:22.957213', NULL, NULL, NULL),
	(288, 'Product', 1, 6, '318I', '30020851', 100, '2024-07-25 15:05:22.962264', NULL, NULL, NULL),
	(289, 'Product', 1, 6, '118D', '10020848', 100, '2024-07-25 15:05:22.967022', NULL, NULL, NULL),
	(290, 'Product', 1, 6, '528', 'B001016', 100, '2024-07-25 15:05:22.972164', NULL, NULL, NULL),
	(291, 'Product', 1, 6, '120I', '10020110', 100, '2024-07-25 15:05:22.979747', NULL, NULL, NULL),
	(292, 'Product', 1, 6, 'X1', 'X0020117', 100, '2024-07-25 15:05:22.984267', NULL, NULL, NULL),
	(293, 'Product', 1, 6, '520 IA', 'B001012', 100, '2024-07-25 15:05:22.989449', NULL, NULL, NULL),
	(294, 'Product', 1, 6, '130I', '10020509', 100, '2024-07-25 15:05:22.994589', NULL, NULL, NULL),
	(295, 'Product', 1, 6, '525', 'B001014', 100, '2024-07-25 15:05:22.999371', NULL, NULL, NULL),
	(296, 'Product', 1, 6, '530D', '50020854', 100, '2024-07-25 15:05:23.004324', NULL, NULL, NULL),
	(297, 'Product', 1, 6, '325 I', 'B001007', 100, '2024-07-25 15:05:23.009777', NULL, NULL, NULL),
	(298, 'Product', 1, 6, 'X6', 'X0021612', 100, '2024-07-25 15:05:23.014963', NULL, NULL, NULL),
	(299, 'Product', 1, 6, 'MERCEDES', 'M010001', 100, '2024-07-25 15:05:23.019593', NULL, NULL, NULL),
	(300, 'Product', 1, 6, '128I', '10020617', 100, '2024-07-25 15:05:23.025264', NULL, NULL, NULL),
	(301, 'Product', 1, 6, '118I', '10021345', 100, '2024-07-25 15:05:23.030213', NULL, NULL, NULL),
	(302, 'Product', 1, 6, 'BOXER', 'B0020846', 101, '2024-07-25 15:05:23.034769', NULL, NULL, NULL),
	(303, 'Product', 1, 6, 'BALENO', 'B003001', 102, '2024-07-25 15:05:23.040208', NULL, NULL, NULL),
	(304, 'Product', 1, 6, 'BEDFORD', 'B004001', 103, '2024-07-25 15:05:23.044969', NULL, NULL, NULL),
	(305, 'Product', 1, 6, 'BEIBEN 2636 DIESEL', 'BE251', 104, '2024-07-25 15:05:23.050107', NULL, NULL, NULL),
	(307, 'Product', 1, 6, 'BEIFANG', 'B005001', 106, '2024-07-25 15:05:23.056446', NULL, NULL, NULL),
	(308, 'Product', 1, 6, 'BELL LOGGER', 'B007001', 107, '2024-07-25 15:05:23.062032', NULL, NULL, NULL),
	(309, 'Product', 1, 6, 'TRAILER', 'T011001', 108, '2024-07-25 15:05:23.067313', NULL, NULL, NULL),
	(310, 'Product', 1, 6, 'BHACHU', 'B008001', 108, '2024-07-25 15:05:23.074097', NULL, NULL, NULL),
	(311, 'Product', 1, 6, 'BW 213D', 'BW213D', 109, '2024-07-25 15:05:23.07903', NULL, NULL, NULL),
	(312, 'Product', 1, 6, 'BUICK', 'B010001', 110, '2024-07-25 15:05:23.084191', NULL, NULL, NULL),
	(313, 'Product', 1, 6, 'BURNS & BLANE', 'B011001', 111, '2024-07-25 15:05:23.089611', NULL, NULL, NULL),
	(314, 'Product', 1, 6, 'BURNS & BLANE TRACTOR', 'B011002', 111, '2024-07-25 15:05:23.094322', NULL, NULL, NULL),
	(315, 'Product', 1, 6, 'BYD6700HZEV2', 'BY00251', 112, '2024-07-25 15:05:23.099224', NULL, NULL, NULL),
	(316, 'Product', 1, 6, 'INYATHI', 'I10001', 113, '2024-07-25 15:05:23.104125', NULL, NULL, NULL),
	(317, 'Product', 1, 6, '570S', '570S', 114, '2024-07-25 15:05:23.109266', NULL, NULL, NULL),
	(318, 'Product', 1, 6, 'CASE INTERNATIONAL', 'C004001', 115, '2024-07-25 15:05:23.114311', NULL, NULL, NULL),
	(319, 'Product', 1, 6, 'CATERPILLAR WHEEL LOADER', 'C005009', 116, '2024-07-25 15:05:23.119739', NULL, NULL, NULL),
	(320, 'Product', 1, 6, 'CATERPILLAR', 'C005001', 116, '2024-07-25 15:05:23.125756', NULL, NULL, NULL),
	(321, 'Product', 1, 6, 'TRACTOR', 'T010001', 116, '2024-07-25 15:05:23.134528', NULL, NULL, NULL),
	(322, 'Product', 1, 6, 'CAT D8R', 'C0021613', 116, '2024-07-25 15:05:23.140213', NULL, NULL, NULL),
	(323, 'Product', 1, 6, 'DOZER', 'D0020627', 116, '2024-07-25 15:05:23.145703', NULL, NULL, NULL),
	(324, 'Product', 1, 6, 'MOTOR GRADER', 'M0020862', 116, '2024-07-25 15:05:23.150465', NULL, NULL, NULL),
	(325, 'Product', 1, 6, 'BACKHOE LOADER', 'B0020861', 116, '2024-07-25 15:05:23.157943', NULL, NULL, NULL),
	(326, 'Product', 1, 6, '250NK', '250NK', 117, '2024-07-25 15:05:23.165541', NULL, NULL, NULL),
	(327, 'Product', 1, 6, 'TIGGO', 'T10001', 118, '2024-07-25 15:05:23.176533', NULL, NULL, NULL),
	(328, 'Product', 1, 6, 'CHEVROLET', 'C007002', 119, '2024-07-25 15:05:23.182158', NULL, NULL, NULL),
	(329, 'Product', 1, 6, 'CAPTIVA', 'C0021616', 119, '2024-07-25 15:05:23.186781', NULL, NULL, NULL),
	(330, 'Product', 1, 6, 'CRUZE', 'C0021617', 119, '2024-07-25 15:05:23.192909', NULL, NULL, NULL),
	(331, 'Product', 1, 6, '2103', '20021357', 119, '2024-07-25 15:05:23.197824', NULL, NULL, NULL),
	(332, 'Product', 1, 6, 'COLORADO', 'C0020385', 119, '2024-07-25 15:05:23.204054', NULL, NULL, NULL),
	(333, 'Product', 1, 6, 'OPTRA', 'O0020865', 119, '2024-07-25 15:05:23.21107', NULL, NULL, NULL),
	(334, 'Product', 1, 6, 'TRAILBLAZER', 'T0021622', 119, '2024-07-25 15:05:23.216062', NULL, NULL, NULL),
	(335, 'Product', 1, 6, 'CHRYSLER', 'C008001', 120, '2024-07-25 15:05:23.224439', NULL, NULL, NULL),
	(336, 'Product', 1, 6, '300C', '30020130', 120, '2024-07-25 15:05:23.229328', NULL, NULL, NULL),
	(337, 'Product', 1, 6, 'CITREON', 'C009001', 121, '2024-07-25 15:05:23.234275', NULL, NULL, NULL),
	(338, 'Product', 1, 6, 'DOMINATOR', 'C010001', 122, '2024-07-25 15:05:23.242193', NULL, NULL, NULL),
	(339, 'Product', 1, 6, 'CMC', 'C011002', 123, '2024-07-25 15:05:23.247863', NULL, NULL, NULL),
	(340, 'Product', 1, 6, 'YORK', 'C011001', 123, '2024-07-25 15:05:23.255342', NULL, NULL, NULL),
	(341, 'Product', 1, 6, 'CRANE', 'C017001', 124, '2024-07-25 15:05:23.260841', NULL, NULL, NULL),
	(342, 'Product', 1, 6, 'DAF', 'D003001', 125, '2024-07-25 15:05:23.277452', NULL, NULL, NULL),
	(343, 'Product', 1, 6, 'MIRA', 'M0020503', 126, '2024-07-25 15:05:23.283524', NULL, NULL, NULL),
	(344, 'Product', 1, 6, 'BOON', 'B0021904', 126, '2024-07-25 15:05:23.290005', NULL, NULL, NULL),
	(345, 'Product', 1, 6, 'BEGO', 'B0021236', 126, '2024-07-25 15:05:23.295844', NULL, NULL, NULL),
	(346, 'Product', 1, 6, 'MOVE', 'M0021372', 126, '2024-07-25 15:05:23.301592', NULL, NULL, NULL),
	(347, 'Product', 1, 6, 'TERIOS', 'D004015', 126, '2024-07-25 15:05:23.307318', NULL, NULL, NULL),
	(348, 'Product', 1, 6, 'DAIHATSU', 'D004001', 126, '2024-07-25 15:05:23.312501', NULL, NULL, NULL),
	(349, 'Product', 1, 6, 'HIJET', 'D004010', 126, '2024-07-25 15:05:23.317503', NULL, NULL, NULL),
	(350, 'Product', 1, 6, 'DATSUN', 'D006001', 127, '2024-07-25 15:05:23.325026', NULL, NULL, NULL),
	(351, 'Product', 1, 6, 'DAYUN', 'D007001', 128, '2024-07-25 15:05:23.331244', NULL, NULL, NULL),
	(352, 'Product', 1, 6, 'DEFENDER', 'D008001', 129, '2024-07-25 15:05:23.338226', NULL, NULL, NULL),
	(353, 'Product', 1, 6, 'DEUTZ', 'D009001', 130, '2024-07-25 15:05:23.34358', NULL, NULL, NULL),
	(354, 'Product', 1, 6, 'Glory 580', 'G008001', 131, '2024-07-25 15:05:23.349728', NULL, NULL, NULL),
	(355, 'Product', 1, 6, 'DISCOVERY', 'D011001', 132, '2024-07-25 15:05:23.357193', NULL, NULL, NULL),
	(356, 'Product', 1, 6, 'DODGE', 'D012001', 133, '2024-07-25 15:05:23.362214', NULL, NULL, NULL),
	(358, 'Product', 1, 6, 'Dongfeng', 'D02201', 135, '2024-07-25 15:05:23.366745', NULL, NULL, NULL),
	(359, 'Product', 1, 6, 'DUMP', 'D015001', 136, '2024-07-25 15:05:23.371787', NULL, NULL, NULL),
	(360, 'Product', 1, 6, 'EICHER', 'E001001', 137, '2024-07-25 15:05:23.378612', NULL, NULL, NULL),
	(361, 'Product', 1, 6, 'FAW', 'F002002', 138, '2024-07-25 15:05:23.383531', NULL, NULL, NULL),
	(362, 'Product', 1, 6, 'UNO', 'F004010', 139, '2024-07-25 15:05:23.388457', NULL, NULL, NULL),
	(363, 'Product', 1, 6, 'FIAT', 'F004001', 139, '2024-07-25 15:05:23.393902', NULL, NULL, NULL),
	(365, 'Product', 1, 6, 'TFM', 'F006001', 140, '2024-07-25 15:05:23.39877', NULL, NULL, NULL),
	(366, 'Product', 1, 6, 'ESCAPE', 'E0021130', 141, '2024-07-25 15:05:23.403552', NULL, NULL, NULL),
	(367, 'Product', 1, 6, 'KUGA', 'K0021383', 141, '2024-07-25 15:05:23.408499', NULL, NULL, NULL),
	(368, 'Product', 1, 6, 'RANGER', 'R008001', 141, '2024-07-25 15:05:23.413708', NULL, NULL, NULL),
	(369, 'Product', 1, 6, 'FOCUS', 'F008025', 141, '2024-07-25 15:05:23.418513', NULL, NULL, NULL),
	(370, 'Product', 1, 6, 'FORD', 'F008001', 141, '2024-07-25 15:05:23.423687', NULL, NULL, NULL),
	(371, 'Product', 1, 6, 'EVEREST', 'E0021917', 141, '2024-07-25 15:05:23.428056', NULL, NULL, NULL),
	(379, 'Product', 1, 6, 'FORKLIFT', 'F009001', 142, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(380, 'Product', 1, 6, 'FORLAND', 'F0020423', 143, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(373, 'Product', 1, 6, 'CAPRI', 'C0021375', 141, '2024-07-25 15:08:20.333587', NULL, NULL, NULL),
	(381, 'Product', 1, 6, 'FOTON', 'F010001', 143, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(376, 'Product', 1, 6, 'MONDEO', 'F008030', 141, '2024-07-25 15:09:32.558999', NULL, NULL, NULL),
	(377, 'Product', 1, 6, 'ESCORT', 'F008005', 141, '2024-07-25 15:09:32.56792', NULL, NULL, NULL),
	(382, 'Product', 1, 6, 'AUMAN', 'A0021386', 143, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(383, 'Product', 1, 6, 'SUPV', 'S0020424', 143, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(384, 'Product', 1, 6, 'TOYOTA', 'T009004', 144, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(385, 'Product', 1, 6, 'GOLF', 'G004001', 144, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(386, 'Product', 1, 6, 'GREATWALL', 'G006001', 145, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(387, 'Product', 1, 6, 'SAME', 'S003002', 146, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(388, 'Product', 1, 6, 'HARDLEY', 'H004001', 147, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(389, 'Product', 1, 6, 'BACK', 'H005001', 148, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(390, 'Product', 1, 6, 'HINO', 'H009001', 149, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(391, 'Product', 1, 6, 'DUTRO', 'D0021926', 149, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(392, 'Product', 1, 6, 'HITACHI', 'H20001', 150, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(393, 'Product', 1, 6, 'STREAM', 'S0020764', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(394, 'Product', 1, 6, 'CIVIC', 'H010005', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(395, 'Product', 1, 6, 'PARTNER', 'P0020010', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(396, 'Product', 1, 6, 'INTEGRA', 'H010009', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(397, 'Product', 1, 6, 'ODYSSEY', 'O0020279', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(398, 'Product', 1, 6, 'FIT', 'F0021771', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(399, 'Product', 1, 6, 'INSIGHT', 'I0020761', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(400, 'Product', 1, 6, 'STEPWAGON', 'S0021259', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(401, 'Product', 1, 6, 'JADE', 'J0021515', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(402, 'Product', 1, 6, 'ODYESSY', 'H010012', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(403, 'Product', 1, 6, 'BR-V', 'B0020003', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(404, 'Product', 1, 6, 'ELYSION', 'E0020999', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(405, 'Product', 1, 6, 'AIRWAVE', 'A0021504', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(406, 'Product', 1, 6, 'BALLADE', 'B0020002', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(407, 'Product', 1, 6, 'HONDA', 'H010001', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(408, 'Product', 1, 6, 'CR-V', 'H010006', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(409, 'Product', 1, 6, 'GRACE', 'G0020276', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(410, 'Product', 1, 6, 'ACCORD', 'H010002', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(411, 'Product', 1, 6, '1300', '10022022', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(412, 'Product', 1, 6, 'VEZEL / HR-V', 'V0021488', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(413, 'Product', 1, 6, 'NX', 'L007005', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(414, 'Product', 1, 6, 'SHUTTLE', 'S0020282', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(415, 'Product', 1, 6, 'CROSSROAD', 'C0021509', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(416, 'Product', 1, 6, 'FREED', 'F0021014', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(417, 'Product', 1, 6, 'MOTORCYCLE', 'H010011', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(418, 'Product', 1, 6, 'HR-V', 'H010008', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(419, 'Product', 1, 6, 'CX', 'C0021246', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(420, 'Product', 1, 6, 'CRX', 'H010007', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(421, 'Product', 1, 6, 'VIGOR', 'H010015', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(422, 'Product', 1, 6, 'FIELDER', 'T009071', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(423, 'Product', 1, 6, 'FTR', 'F0021248', 151, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(424, 'Product', 1, 6, 'G10K', 'G009002', 152, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(425, 'Product', 1, 6, 'H3', 'H013001', 153, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(426, 'Product', 1, 6, 'YOUNG TRAILER', 'H001001', 154, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(427, 'Product', 1, 6, 'HYSTER', 'H015001', 155, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(428, 'Product', 1, 6, 'TUCSON', 'T0020295', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(429, 'Product', 1, 6, 'HD', 'H0020531', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(430, 'Product', 1, 6, 'STELLER', 'H016009', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(431, 'Product', 1, 6, 'SANTA FE', 'S0020536', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(432, 'Product', 1, 6, 'SONATA', 'H016008', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(433, 'Product', 1, 6, 'TUSCON', 'T0020027', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(434, 'Product', 1, 6, 'CRETA', 'C0021499', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(435, 'Product', 1, 6, 'ACCENT', 'H016002', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(436, 'Product', 1, 6, 'HYUNDAI', 'H016001', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(437, 'Product', 1, 6, 'STELLAR', 'S0020538', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(438, 'Product', 1, 6, 'HD72', 'H0020504', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(439, 'Product', 1, 6, 'HD-65', 'H0020289', 156, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(440, 'Product', 1, 6, 'I', 'I0020995', 157, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(441, 'Product', 1, 6, 'INTERNATIONAL', 'I002002', 158, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(442, 'Product', 1, 6, 'NHR', 'I003019', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(443, 'Product', 1, 6, 'FORWARD', 'F0021274', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(444, 'Product', 1, 6, 'NQR66', 'I003018', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(445, 'Product', 1, 6, 'TANKER', 'T003001', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(447, 'Product', 1, 6, 'FRR33L', 'I003020', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(448, 'Product', 1, 6, 'FFR', 'F0020031', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(449, 'Product', 1, 6, 'TFR', 'I003012', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(450, 'Product', 1, 6, 'FSR', 'F0020545', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(451, 'Product', 1, 6, 'NKR', 'I003016', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(452, 'Product', 1, 6, 'CXZ', 'C0020030', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(453, 'Product', 1, 6, 'FUSO', 'M014022', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(455, 'Product', 1, 6, 'FVZ', 'F0021275', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(456, 'Product', 1, 6, 'D-MAX', 'D0021540', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(457, 'Product', 1, 6, 'TROOPER', 'T014001', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(458, 'Product', 1, 6, 'GIGA', 'G0021797', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(459, 'Product', 1, 6, 'FVX', 'F0020298', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(460, 'Product', 1, 6, 'NPR', 'I003013', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(461, 'Product', 1, 6, 'FRR', 'F0021796', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(462, 'Product', 1, 6, 'TFR54', 'T0020804', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(463, 'Product', 1, 6, 'FVR', 'I003001', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(464, 'Product', 1, 6, 'TROOPER 4 WD', 'I003008', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(465, 'Product', 1, 6, 'TFS', 'I003014', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(466, 'Product', 1, 6, 'ELF VAN', 'E0020543', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(467, 'Product', 1, 6, 'VAN', 'I003009', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(468, 'Product', 1, 6, '117', '10021042', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(469, 'Product', 1, 6, 'NQR', 'N0020803', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(470, 'Product', 1, 6, 'KB', 'K0021829', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(471, 'Product', 1, 6, 'BIGHORN', 'B0021272', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(472, 'Product', 1, 6, 'ELF TRUCK', 'E0021273', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(473, 'Product', 1, 6, 'PICKUP', 'I003007', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(474, 'Product', 1, 6, 'TIPPER', 'M014026', 159, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(475, 'Product', 1, 6, 'VAN', 'I005002', 160, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(476, 'Product', 1, 6, 'IVECO', 'I005004', 160, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(477, 'Product', 1, 6, 'J.C.B', 'J001001', 161, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(478, 'Product', 1, 6, 'HFC5037XGCDEV1', 'H20003', 162, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(479, 'Product', 1, 6, 'XJ16', 'J002003', 163, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(480, 'Product', 1, 6, 'XF', 'X0021298', 163, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(481, 'Product', 1, 6, 'JAGUAR', 'J002001', 163, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(482, 'Product', 1, 6, 'WILLYS', 'W0020808', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(483, 'Product', 1, 6, 'GRAND CHEROKEE', 'J005002', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(484, 'Product', 1, 6, 'JEEPSTER', 'J0020807', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(485, 'Product', 1, 6, 'PATRIOT', 'P0021832', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(486, 'Product', 1, 6, 'COMPASS', 'C0020575', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(487, 'Product', 1, 6, 'CHEROKEE', 'J005001', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(488, 'Product', 1, 6, 'GRAND CHEROKEE LTD', 'J005003', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(489, 'Product', 1, 6, 'WRANGLER', 'J005004', 164, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(490, 'Product', 1, 6, 'JC 180', 'J007002', 165, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(491, 'Product', 1, 6, 'DEERE', 'J007001', 166, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(492, 'Product', 1, 6, 'KG PLATE', 'K007001', 167, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(493, 'Product', 1, 6, 'CERATO', 'C0020809', 168, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(494, 'Product', 1, 6, 'KIA', 'K002001', 168, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(495, 'Product', 1, 6, 'K2700', 'K0020811', 168, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(496, 'Product', 1, 6, 'SPORTAGE', 'K002008', 168, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(497, 'Product', 1, 6, 'SORENTO', 'S0021569', 168, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(498, 'Product', 1, 6, 'KIBO', 'K1201', 169, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(499, 'Product', 1, 6, 'KOMATSU', 'K005001', 170, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(500, 'Product', 1, 6, 'KORANDO', 'K006001', 171, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(501, 'Product', 1, 6, 'LAE', 'L003001', 172, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(502, 'Product', 1, 6, 'CRUISER', 'T018001', 173, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(503, 'Product', 1, 6, 'LANDCRUISER PRADO', 'T009025', 173, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(504, 'Product', 1, 6, 'TOYOTA', 'T009004', 173, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(505, 'Product', 1, 6, 'LANDINI', 'L004001', 174, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(506, 'Product', 1, 6, '88', '80020585', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(507, 'Product', 1, 6, 'TO BE ADVISED', 'T017001', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(508, 'Product', 1, 6, 'DEFENDER 110', 'D0020815', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(509, 'Product', 1, 6, 'DISCOVERY', 'D011001', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(510, 'Product', 1, 6, 'RANGE ROVER EVOQUE', 'R0021311', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(511, 'Product', 1, 6, 'FREELANDER', 'L001004', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(512, 'Product', 1, 6, 'RANGE ROVER VOGUE', 'R0020081', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(513, 'Product', 1, 6, 'LANDROVER', 'L001001', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(515, 'Product', 1, 6, '109', '10020584', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(516, 'Product', 1, 6, 'RANGE ROVER SPORT', 'R0020080', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(517, 'Product', 1, 6, 'LR3', 'L0021310', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(518, 'Product', 1, 6, 'DEFENDER', 'L001002', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(519, 'Product', 1, 6, 'RANGE ROVER', 'R0021079', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(520, 'Product', 1, 6, 'DEFENDER 90', 'D0020816', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(521, 'Product', 1, 6, 'DISCOVERY 4WD', 'L001003', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(522, 'Product', 1, 6, 'DISCOVERY IV', 'D0020345', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(523, 'Product', 1, 6, 'DISCOVERY I', 'D0021308', 175, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(524, 'Product', 1, 6, 'NX', 'L007005', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(525, 'Product', 1, 6, 'LX', 'L0021313', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(526, 'Product', 1, 6, 'LX-570', 'LX-570', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(527, 'Product', 1, 6, '570', '50021573', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(528, 'Product', 1, 6, 'IS', 'L007001', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(529, 'Product', 1, 6, 'RX', 'R0020818', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(530, 'Product', 1, 6, 'RX450H', 'T0090301', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(531, 'Product', 1, 6, 'LS', 'L007004', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(532, 'Product', 1, 6, 'LEXUS', 'T009026', 176, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(533, 'Product', 1, 6, 'LEYLAND', 'L002002', 177, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(534, 'Product', 1, 6, 'ASHOK', 'A006001', 177, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(535, 'Product', 1, 6, '365', 'M001002', 178, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(536, 'Product', 1, 6, 'BOLERO', 'B0020350', 179, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(537, 'Product', 1, 6, 'MAHINDRA', 'M003001', 179, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(538, 'Product', 1, 6, '6000', '60020348', 179, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(539, 'Product', 1, 6, 'SCORPIO', 'S0020592', 179, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(540, 'Product', 1, 6, 'TGS', 'T0021849', 180, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(541, 'Product', 1, 6, 'TGA', 'T0021321', 180, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(542, 'Product', 1, 6, '19.372', '10021318', 180, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(543, 'Product', 1, 6, 'MAN', 'M004001', 180, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(544, 'Product', 1, 6, 'MANTI', 'M005001', 181, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(545, 'Product', 1, 6, 'GYPSI', 'M006004', 182, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(546, 'Product', 1, 6, '135', '10020352', 183, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(547, 'Product', 1, 6, '290', '20020087', 183, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(548, 'Product', 1, 6, 'FERGUSON.', 'M008001', 183, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(549, 'Product', 1, 6, 'MF6400', 'M0020824', 183, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(550, 'Product', 1, 6, 'CX-5', 'C0020358', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(551, 'Product', 1, 6, 'ATENZA', 'A0021855', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(552, 'Product', 1, 6, 'FAMILIA', 'F0021858', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(553, 'Product', 1, 6, 'BONGO', 'B0021834', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(554, 'Product', 1, 6, 'AXELA', 'A0020601', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(555, 'Product', 1, 6, 'B-2000', 'M009008', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(556, 'Product', 1, 6, 'CX-3', 'C0021588', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(557, 'Product', 1, 6, 'T3500', 'M009021', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(558, 'Product', 1, 6, 'CX-9', 'C0021086', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(559, 'Product', 1, 6, 'DEMIO', 'D0021589', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(560, 'Product', 1, 6, 'MAZDA', 'M009001', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(561, 'Product', 1, 6, 'VERISA', 'M009034', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(562, 'Product', 1, 6, 'AE 100', 'T009039', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(563, 'Product', 1, 6, 'CX-7', 'C0021085', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(564, 'Product', 1, 6, 'CX-30', 'C0020357', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(565, 'Product', 1, 6, '626', 'M009004', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(566, 'Product', 1, 6, 'PREMACY', 'P0020832', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(567, 'Product', 1, 6, 'CAROL', 'C0021857', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(568, 'Product', 1, 6, '323', 'M009002', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(569, 'Product', 1, 6, 'BT-50', 'B0020603', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(570, 'Product', 1, 6, 'MX-6', 'M0020830', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(571, 'Product', 1, 6, 'T4000', 'M009023', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(572, 'Product', 1, 6, 'FORERUNNER', 'T009017', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(573, 'Product', 1, 6, '110', '10020825', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(574, 'Product', 1, 6, 'NISSAN', 'N003035', 184, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(575, 'Product', 1, 6, '200E', '20020037', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(576, 'Product', 1, 6, 'BENZ 200', 'M010036', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(577, 'Product', 1, 6, 'ML 350', 'M0020326', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(578, 'Product', 1, 6, 'BENZ 140D', 'M010026', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(579, 'Product', 1, 6, 'MAYBACH', 'M0020792', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(580, 'Product', 1, 6, 'MARK X', '1000', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(581, 'Product', 1, 6, 'G-CLASS', 'G0021550', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(582, 'Product', 1, 6, '911', 'P009002', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(583, 'Product', 1, 6, 'GLE 350', 'G0020790', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(584, 'Product', 1, 6, 'BENZ E200', 'M010035', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(585, 'Product', 1, 6, 'AMG C43', 'A0021280', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(586, 'Product', 1, 6, 'E300', 'E0020786', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(587, 'Product', 1, 6, 'E-CLASS', 'E0020784', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(588, 'Product', 1, 6, 'A180', 'A0021805', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(589, 'Product', 1, 6, '250', 'M010011', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(590, 'Product', 1, 6, 'MERCEDES', 'M010001', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(591, 'Product', 1, 6, 'ACTROS', 'A0020311', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(592, 'Product', 1, 6, 'E220', 'E0021285', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(593, 'Product', 1, 6, 'C180', 'C0020778', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(594, 'Product', 1, 6, 'ML 320', 'M0021056', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(595, 'Product', 1, 6, 'E280', 'E0021053', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(596, 'Product', 1, 6, 'SLK CLASS', 'S0020058', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(597, 'Product', 1, 6, 'M CLASS', 'M0020791', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(598, 'Product', 1, 6, '200', 'D006006', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(599, 'Product', 1, 6, 'B-CLASS', 'B0021546', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(600, 'Product', 1, 6, '230E', '20020546', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(601, 'Product', 1, 6, 'COMPRESSOR', 'M010034', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(602, 'Product', 1, 6, 'GL CLASS', 'G0020051', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(603, 'Product', 1, 6, 'CLA-CLASS', 'C0021283', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(604, 'Product', 1, 6, 'E240', 'E0021286', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(605, 'Product', 1, 6, 'AXOR', 'A0020043', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(606, 'Product', 1, 6, 'BENZ', 'M010037', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(607, 'Product', 1, 6, '220', 'M010006', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(608, 'Product', 1, 6, 'B180', 'B0020313', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(609, 'Product', 1, 6, 'E200', 'E0021807', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(610, 'Product', 1, 6, 'C220', 'C0020045', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(611, 'Product', 1, 6, 'BENZ 300', 'M010028', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(612, 'Product', 1, 6, 'E400', 'E0021287', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(613, 'Product', 1, 6, 'C250', 'C0020551', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(614, 'Product', 1, 6, 'S350', 'S0020055', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(615, 'Product', 1, 6, 'BENZ ACTROS', 'M010039', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(616, 'Product', 1, 6, 'S 500', 'M010033', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(617, 'Product', 1, 6, 'GLC', 'G0020789', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(618, 'Product', 1, 6, 'BENZ E200 Auto', 'M010040', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(619, 'Product', 1, 6, '1922', '10020035', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(620, 'Product', 1, 6, 'CLS', 'C0020782', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(621, 'Product', 1, 6, '280 E', 'M010015', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(623, 'Product', 1, 6, 'C200', 'C0020550', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(624, 'Product', 1, 6, 'E250', 'E0021548', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(625, 'Product', 1, 6, 'E350', 'E0020317', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(626, 'Product', 1, 6, 'GLE', 'G0021289', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(627, 'Product', 1, 6, 'G63', 'G0021552', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(628, 'Product', 1, 6, '300E', '30021544', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(629, 'Product', 1, 6, 'GLE 43', 'G0020052', 185, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(630, 'Product', 1, 6, 'MGB', 'M011001', 186, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(631, 'Product', 1, 6, 'MINI', 'M0020059', 187, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(632, 'Product', 1, 6, 'COOPER', 'C0020564', 187, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(633, 'Product', 1, 6, 'MITSUBISHI', 'M014002', 188, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(634, 'Product', 1, 6, 'FH', 'F0021065', 188, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(635, 'Product', 1, 6, 'AIRTREK', 'A0021819', 188, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(636, 'Product', 1, 6, 'LANCER', 'M014010', 188, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(637, 'Product', 1, 6, 'ASX', 'A0020060', 188, '2024-07-25 15:38:14.421495', NULL, NULL, NULL),
	(901, 'Product', 1, 6, 'CAMRY', 'T009006', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(902, 'Product', 1, 6, 'PASSO', 'T009072', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(903, 'Product', 1, 6, 'LAND CRUISER PRADO', 'L0020202', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(904, 'Product', 1, 6, 'RAUM', 'R0020209', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(905, 'Product', 1, 6, 'WISH', 'T009070', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(906, 'Product', 1, 6, 'AURIS', 'A0020464', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(907, 'Product', 1, 6, 'TOWNACE', 'T0021463', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(908, 'Product', 1, 6, 'ISIS', 'I0021993', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(909, 'Product', 1, 6, 'TOWN ACE', 'T009045', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(910, 'Product', 1, 6, 'DYNA', 'T009015', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(911, 'Product', 1, 6, 'IST', 'I0020470', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(912, 'Product', 1, 6, 'LANDCRUISER HARDTOP VX', 'T009024', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(913, 'Product', 1, 6, 'MARK II', 'T009021', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(914, 'Product', 1, 6, 'HARRIER', 'T009003', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(915, 'Product', 1, 6, 'LEXUS', 'T009026', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(916, 'Product', 1, 6, 'SPACIO', 'T009062', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(917, 'Product', 1, 6, 'FJ CRUISER', 'F0020950', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(918, 'Product', 1, 6, 'DBA-ZRR70W', 'DBA-ZRR70W', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(919, 'Product', 1, 6, 'LITE-ACE', 'L0021458', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(920, 'Product', 1, 6, 'GAIA', 'G0020469', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(921, 'Product', 1, 6, 'RETRO', 'R0021462', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(922, 'Product', 1, 6, 'CAMI', 'C0021200', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(923, 'Product', 1, 6, 'PROBOX', 'T009077', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(924, 'Product', 1, 6, 'VANGUARD', 'T009078', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(925, 'Product', 1, 6, '86', '80020253', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(926, 'Product', 1, 6, 'AXION', 'A0021199', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(927, 'Product', 1, 6, 'PIXIS', 'P0021996', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(928, 'Product', 1, 6, 'CBA-ZZT240', 'CBA-ZZT240', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(929, 'Product', 1, 6, 'RAGIUS VAN', 'R0020717', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(930, 'Product', 1, 6, 'COASTER', 'T009009', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(931, 'Product', 1, 6, 'SPRINTER', 'T009043', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(932, 'Product', 1, 6, 'CRUISER', 'T018001', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(933, 'Product', 1, 6, 'C-HR', 'C0021696', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(934, 'Product', 1, 6, 'DENSO', 'D0020468', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(935, 'Product', 1, 6, '4-RUNNER', '40021990', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(936, 'Product', 1, 6, 'CELICA', 'T009008', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(937, 'Product', 1, 6, 'TOYOTA', 'T009004', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(938, 'Product', 1, 6, 'HILUX', 'T009020', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(939, 'Product', 1, 6, 'AXIO', 'AXIO', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(940, 'Product', 1, 6, 'LAND CRUISER', 'L0021994', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(941, 'Product', 1, 6, 'RUSH', 'R0020952', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(942, 'Product', 1, 6, 'VOXY', 'T009066', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(943, 'Product', 1, 6, 'CORONA', 'T009011', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(944, 'Product', 1, 6, 'CALDINA', 'T009042', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(945, 'Product', 1, 6, 'SIENTA', 'T009053', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(946, 'Product', 1, 6, 'SURF', 'T009046', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(947, 'Product', 1, 6, 'KLUGER', 'K0021456', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(948, 'Product', 1, 6, 'IPSUM', 'IPSUM', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(949, 'Product', 1, 6, 'VOLTZ', 'T009065', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(950, 'Product', 1, 6, 'VISTA', 'V0020998', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(951, 'Product', 1, 6, '1000', 'D004002', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(952, 'Product', 1, 6, 'CRESSIDA', 'T009012', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(953, 'Product', 1, 6, 'VITZ', 'T009052', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(954, 'Product', 1, 6, 'PRADO', 'T009031', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(955, 'Product', 1, 6, 'ESTIMA', 'T009044', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(956, 'Product', 1, 6, 'LANDCRUISER', 'T009022', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(958, 'Product', 1, 6, 'FORTUNER', 'T009069', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(959, 'Product', 1, 6, 'AQUA', 'A0020501', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(960, 'Product', 1, 6, 'CROWN', 'T009013', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(961, 'Product', 1, 6, 'LANDCRUISER 4WD', 'T009023', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(962, 'Product', 1, 6, 'VAN', 'T009036', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(963, 'Product', 1, 6, 'T100', 'T0021703', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(964, 'Product', 1, 6, 'TOURING', 'T009059', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(965, 'Product', 1, 6, 'TRD', 'T0020721', 228, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(968, 'Product', 1, 6, 'TRAILER', 'T011001', 230, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(969, 'Product', 1, 6, 'HILUX', 'T009020', 230, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(970, 'Product', 1, 6, 'TRAIN', 'T012001', 231, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(971, 'Product', 1, 6, 'TRUCK', 'T015001', 232, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(972, 'Product', 1, 6, 'APACHE', 'A0140010', 233, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(973, 'Product', 1, 6, 'VAUXHALL', 'V001002', 234, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(974, 'Product', 1, 6, 'TOUAREG', 'V004011', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(975, 'Product', 1, 6, 'JETTA', 'J006001', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(976, 'Product', 1, 6, 'POLO', 'P007001', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(978, 'Product', 1, 6, 'TRANSPORTER', 'T0022008', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(979, 'Product', 1, 6, 'BEETLE', 'B0020727', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(980, 'Product', 1, 6, 'VOLKSWAGEN', 'V004001', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(981, 'Product', 1, 6, 'POLO VIVO', 'P0021213', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(982, 'Product', 1, 6, 'VAN', 'V004007', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(984, 'Product', 1, 6, 'TIGUAN', 'T0020228', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(985, 'Product', 1, 6, 'CROSSGOLF', 'C0020479', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(986, 'Product', 1, 6, 'PASSAT', 'V004005', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(987, 'Product', 1, 6, 'CRAFTER', 'C0020478', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(989, 'Product', 1, 6, 'GOLF', 'G004001', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(990, 'Product', 1, 6, 'AMAROK', 'A0021207', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(991, 'Product', 1, 6, 'TOURAN', 'T0020480', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(992, 'Product', 1, 6, '1500', '10020849', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(993, 'Product', 1, 6, 'CADDY', 'V004013', 235, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(994, 'Product', 1, 6, 'XC60', 'X0020485', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(995, 'Product', 1, 6, 'FH12', 'F0020732', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(996, 'Product', 1, 6, 'V60', 'V0020484', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(997, 'Product', 1, 6, 'V40', 'V0020735', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(998, 'Product', 1, 6, 'XC90', 'X0020970', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(999, 'Product', 1, 6, 'S80', 'S0021725', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1000, 'Product', 1, 6, 'VOLVO', 'V005001', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1001, 'Product', 1, 6, 'S90', 'V005010', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1002, 'Product', 1, 6, 'V70', 'V005014', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1003, 'Product', 1, 6, 'S60', 'S0020968', 236, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1004, 'Product', 1, 6, 'WRANGLER', 'W002001', 237, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1005, 'Product', 1, 6, 'YAMAHA', 'Y002001', 238, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1006, 'Product', 1, 6, 'YORK', 'Y003001', 239, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(1007, 'Product', 1, 6, 'ZUSUKI', 'Z001001', 240, '2024-07-25 15:48:08.323615', NULL, NULL, NULL),
	(17, 'Product', 1, 3, 'SPECIAL VEHICLES - CRANES,FORKLIFTS,ROLLERS & EXCAVATORS', '011', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(21, 'Product', 1, 3, 'PSV PRIVATE HIRE(CHAUFFER DRIVEN) - TOURS & CORPORATE HIRES ONLY', '005', NULL, '2024-07-25 13:00:42.951439', NULL, NULL, NULL),
	(1008, 'Product', 999, 7, 'JAZK HQ', '101', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(1009, 'Product', 999, 7, 'Westlands', '103', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(1010, 'Product', 999, 7, 'Mombasa', '104', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(1011, 'Product', 999, 7, 'Kisumu', '105', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(1012, 'Product', 999, 7, 'Nakuru', '106', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(1013, 'Product', 999, 7, 'Eldoret', '107', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(1014, 'Product', 999, 7, 'Thika', '108', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(1015, 'Product', 999, 7, 'Meru', '109', NULL, '2024-08-02 21:48:19.395883', NULL, NULL, NULL),
	(638, 'Product', 1, 6, 'ECLIPSE', 'E0021064', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(639, 'Product', 1, 6, 'OUTLANDER', 'O0021826', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(642, 'Product', 1, 6, 'FUSO', 'F017', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(643, 'Product', 1, 6, 'SPORT EDITION', 'S0021387', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(644, 'Product', 1, 6, 'PAJERO', 'M014011', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(645, 'Product', 1, 6, 'SHOGUN', 'S0020332', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(646, 'Product', 1, 6, 'ROSA', 'R0020571', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(647, 'Product', 1, 6, 'RVR', 'R0020800', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(648, 'Product', 1, 6, 'EK', 'E0020568', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(649, 'Product', 1, 6, 'FUSO FN 617', 'M014024', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(650, 'Product', 1, 6, 'MARK II', 'T009021', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(651, 'Product', 1, 6, 'L 200', 'M014008', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(652, 'Product', 1, 6, 'DELICA', 'D0020061', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(653, 'Product', 1, 6, 'FUSO FIGHTER', 'F0021560', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(654, 'Product', 1, 6, 'VR 4 WD', 'M014023', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(655, 'Product', 1, 6, 'GALANT', 'M014007', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(657, 'Product', 1, 6, 'TIPPER', 'M014026', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(658, 'Product', 1, 6, 'DELICE', 'M014021', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(659, 'Product', 1, 6, 'L200', 'L0020329', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(660, 'Product', 1, 6, 'MARINO', 'T009056', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(661, 'Product', 1, 6, 'DYNA TRUCK', 'D0020062', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(662, 'Product', 1, 6, 'PAJERO MINI', 'P0021562', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(663, 'Product', 1, 6, 'COLT', 'C014001', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(664, 'Product', 1, 6, 'MIRAGE', 'M0020067', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(665, 'Product', 1, 6, 'PAJERO 4WD (LWB)', 'M014012', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(666, 'Product', 1, 6, 'CANTER', 'M014004', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(667, 'Product', 1, 6, 'PAJERO SPORT', 'P0020331', 188, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(668, 'Product', 1, 6, 'III', 'III', 189, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(669, 'Product', 1, 6, 'MORRIS', 'M016001', 190, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(670, 'Product', 1, 6, 'MUSSO', 'M018001', 191, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(671, 'Product', 1, 6, 'TOYOTA', 'T009004', 192, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(672, 'Product', 1, 6, 'HOLLAND', 'N002001', 193, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(673, 'Product', 1, 6, 'CARAVAN', 'N003031', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(674, 'Product', 1, 6, 'LATIO', 'L0021149', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(675, 'Product', 1, 6, 'DUALIS', 'D0020661', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(676, 'Product', 1, 6, 'FUGA', 'F0020663', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(677, 'Product', 1, 6, 'PICKUP', 'N003014', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(678, 'Product', 1, 6, 'XTERRA', 'X0020432', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(679, 'Product', 1, 6, '2400', 'N003036', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(680, 'Product', 1, 6, 'P/UP B140', 'N003033', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(681, 'Product', 1, 6, 'TERRANO', 'N003021', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(682, 'Product', 1, 6, 'SERENA', 'S0021491', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(683, 'Product', 1, 6, 'SUNNY', 'N003019', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(684, 'Product', 1, 6, 'ALMERA', 'A0020158', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(685, 'Product', 1, 6, 'NAVARA', 'N003051', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(686, 'Product', 1, 6, '1400', '10021928', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(687, 'Product', 1, 6, 'HARD BODY', 'N003032', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(688, 'Product', 1, 6, 'SILVER', 'N003034', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(689, 'Product', 1, 6, 'VANETTE', 'V0020903', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(690, 'Product', 1, 6, 'CIVILIAN BUS', 'N003003', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(691, 'Product', 1, 6, 'URVAN', 'N003024', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(692, 'Product', 1, 6, 'DAYZ', 'D02202', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(693, 'Product', 1, 6, 'NP300', 'N0020161', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(694, 'Product', 1, 6, 'FB14', 'F0021145', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(695, 'Product', 1, 6, 'PATHFINDER', 'N003012', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(696, 'Product', 1, 6, 'LEAF', 'L0021933', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(697, 'Product', 1, 6, 'WINGROAD', 'W0021940', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(698, 'Product', 1, 6, 'LAFESTA', 'L0021148', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(699, 'Product', 1, 6, 'ADVAN', 'A0020896', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(700, 'Product', 1, 6, 'PRIMERA', 'N003016', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(701, 'Product', 1, 6, 'VAN', 'N003025', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(702, 'Product', 1, 6, 'PORTE', 'T009074', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(703, 'Product', 1, 6, 'MICRA', 'M0021150', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(704, 'Product', 1, 6, 'SKYLINE', 'N003017', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(705, 'Product', 1, 6, 'UD', 'U0020902', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(706, 'Product', 1, 6, 'BLUEBIRD', 'N003001', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(707, 'Product', 1, 6, 'COASTER', 'N003004', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(708, 'Product', 1, 6, 'PATROL', 'N003013', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(709, 'Product', 1, 6, 'HARDBODY', 'H0021146', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(710, 'Product', 1, 6, 'DATSUN', 'N003029', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(711, 'Product', 1, 6, 'SUPER SALOON', 'N003020', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(712, 'Product', 1, 6, 'TIIDA', 'N003050', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(713, 'Product', 1, 6, 'PICK-UP', 'P0020667', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(714, 'Product', 1, 6, 'TEANA', 'T0021939', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(715, 'Product', 1, 6, 'NV200', 'N0021151', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(716, 'Product', 1, 6, 'MURANO', 'M0020899', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(717, 'Product', 1, 6, 'NP200', 'N0021934', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(718, 'Product', 1, 6, 'QASHQAI', 'Q0021396', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(719, 'Product', 1, 6, 'ELGRAND', 'E0020159', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(720, 'Product', 1, 6, 'TRAILRUNNER', 'T0020431', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(721, 'Product', 1, 6, 'NOTE', 'N0020666', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(722, 'Product', 1, 6, 'MARCH', 'N003049', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(723, 'Product', 1, 6, 'JUKE', 'J0020665', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(724, 'Product', 1, 6, 'B12', 'N003045', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(725, 'Product', 1, 6, 'ATLAS', 'N003030', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(726, 'Product', 1, 6, 'NOAH', 'T009063', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(727, 'Product', 1, 6, 'NISSAN', 'N003035', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(728, 'Product', 1, 6, 'X-TRAIL', 'N003048', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(729, 'Product', 1, 6, 'CONDOR', 'C0021144', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(730, 'Product', 1, 6, 'SYLPHY', 'S0020163', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(731, 'Product', 1, 6, 'CUBE', 'C0021931', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(732, 'Product', 1, 6, 'CIVILLIAN', 'C0020428', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(733, 'Product', 1, 6, 'TRUCK', 'N003022', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(734, 'Product', 1, 6, 'CGD 21', 'N003028', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(735, 'Product', 1, 6, 'CLIPPER', 'C0020659', 194, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(736, 'Product', 1, 6, 'KNOWN', 'N005001', 195, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(737, 'Product', 1, 6, 'CORSA', 'O005006', 196, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(738, 'Product', 1, 6, 'CATERPILLAR', 'C005001', 197, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(739, 'Product', 1, 6, 'CATERPILLAR WHEEL LOADER', 'C005009', 197, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(740, 'Product', 1, 6, 'CANTER', 'M014004', 197, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(741, 'Product', 1, 6, 'KAWASAKI', 'K001001', 197, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(742, 'Product', 1, 6, 'PAJERO', 'M019001', 198, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(743, 'Product', 1, 6, 'PEUGEOT', 'P003001', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(744, 'Product', 1, 6, '207', '20021409', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(745, 'Product', 1, 6, '204', 'P003002', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(746, 'Product', 1, 6, 'TOYOTA', 'T009004', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(747, 'Product', 1, 6, '504', 'P003006', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(748, 'Product', 1, 6, 'PARTNER', 'P0020010', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(749, 'Product', 1, 6, '206', 'P003015', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(750, 'Product', 1, 6, '404', 'P003016', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(751, 'Product', 1, 6, '307', 'P003019', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(752, 'Product', 1, 6, '103', '10020908', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(753, 'Product', 1, 6, '208', '20021946', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(754, 'Product', 1, 6, '406', 'P003017', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(755, 'Product', 1, 6, '2008', '20021165', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(756, 'Product', 1, 6, '3008', '30021662', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(757, 'Product', 1, 6, '405', 'P003005', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(758, 'Product', 1, 6, '508', '50020675', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(759, 'Product', 1, 6, '308', '30021166', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(760, 'Product', 1, 6, '407', '40020674', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(761, 'Product', 1, 6, '306', 'P003004', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(762, 'Product', 1, 6, '505', 'P003008', 199, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(763, 'Product', 1, 6, 'PIAGGIO', 'P004001', 200, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(764, 'Product', 1, 6, 'RZR', 'R1017', 201, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(765, 'Product', 1, 6, 'CAYENNE', 'P009004', 202, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(766, 'Product', 1, 6, 'PORCHE', 'P009001', 202, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(767, 'Product', 1, 6, 'MACAN', 'M0021667', 202, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(768, 'Product', 1, 6, 'BRAND', 'P011002', 203, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(769, 'Product', 1, 6, 'PRONTO', 'P013001', 204, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(770, 'Product', 1, 6, 'PROTON', 'P012002', 205, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(771, 'Product', 1, 6, 'TRAILER', 'T011001', 206, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(772, 'Product', 1, 6, 'RANDOM', 'R001001', 206, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(773, 'Product', 1, 6, 'ROVER VOUGE', 'R002003', 207, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(774, 'Product', 1, 6, 'ROVER', 'R002001', 207, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(775, 'Product', 1, 6, 'ROVER 4.6HSE', 'R002004', 207, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(776, 'Product', 1, 6, 'RANGER', 'R008001', 208, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(777, 'Product', 1, 6, '17', '10020407', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(778, 'Product', 1, 6, 'KANGOO', 'K0020261', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(779, 'Product', 1, 6, 'DUSTER', 'D0020173', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(780, 'Product', 1, 6, 'RENAULT', 'R004007', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(781, 'Product', 1, 6, 'KOLEOS', 'K0021958', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(782, 'Product', 1, 6, 'PREMIUM', 'R004006', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(783, 'Product', 1, 6, 'FLUENCE', 'F0021671', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(784, 'Product', 1, 6, 'KERAX', 'R004008', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(785, 'Product', 1, 6, '4', '40021954', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(787, 'Product', 1, 6, 'KADJAR', 'K0020688', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(788, 'Product', 1, 6, 'KWID', 'K0021420', 209, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(789, 'Product', 1, 6, 'DEERE', 'J007001', 210, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(790, 'Product', 1, 6, 'SAME', 'S003002', 210, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(791, 'Product', 1, 6, 'FRUTETO', 'S003001', 210, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(792, 'Product', 1, 6, 'SANAYI', 'S005001', 211, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(793, 'Product', 1, 6, 'P410', 'P0021435', 212, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(794, 'Product', 1, 6, 'SCANIA', 'S006001', 212, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(795, 'Product', 1, 6, 'P380', 'P0021434', 212, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(796, 'Product', 1, 6, 'P360', 'P0020693', 212, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(797, 'Product', 1, 6, 'SCODA', 'S007001', 213, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(798, 'Product', 1, 6, '5X3254DM324R', 'SC0025', 214, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(799, 'Product', 1, 6, 'SHANTUI', 'S010001', 215, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(800, 'Product', 1, 6, 'XY175', 'X0021677', 216, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(802, 'Product', 1, 6, 'HOWO', 'H017010', 217, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(803, 'Product', 1, 6, 'SKODA', 'S016001', 218, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(804, 'Product', 1, 6, 'SKYGO', 'Z002004', 219, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(805, 'Product', 1, 6, 'SSANGYONG', 'S017001', 220, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(806, 'Product', 1, 6, 'SUBARU', 'S019001', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(807, 'Product', 1, 6, 'IMPREZA', 'S019009', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(808, 'Product', 1, 6, 'OUTBACK', 'OUTB', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(809, 'Product', 1, 6, 'FORESTER', 'F0021969', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(810, 'Product', 1, 6, 'FORRESTER', 'S019007', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(811, 'Product', 1, 6, 'TREZIA', 'T0020699', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(812, 'Product', 1, 6, 'LEGACY', 'S019004', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(813, 'Product', 1, 6, 'LEVORG', 'L0021437', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(814, 'Product', 1, 6, 'STX', 'S0020697', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(815, 'Product', 1, 6, 'PLEO', 'P0021971', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(816, 'Product', 1, 6, 'EXIGA', 'E0020448', 221, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(817, 'Product', 1, 6, 'EVERY', 'E0021184', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(818, 'Product', 1, 6, 'CARRYTRUCK', 'C0020701', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(819, 'Product', 1, 6, 'BALENO', 'B003001', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(820, 'Product', 1, 6, 'HUSTLER', 'H0021492', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(821, 'Product', 1, 6, 'DZIRE', 'D0021686', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(822, 'Product', 1, 6, 'ERTIGA', 'E0020449', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(823, 'Product', 1, 6, 'GRAND VITARA', 'G0020705', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(824, 'Product', 1, 6, 'IGNIS', 'I0010001', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(825, 'Product', 1, 6, 'ALTO', 'A0020897', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(826, 'Product', 1, 6, 'ESCUDO', 'S020009', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(828, 'Product', 1, 6, 'SOLIA', 'S0020459', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(829, 'Product', 1, 6, 'SAMURAI', 'S020004', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(830, 'Product', 1, 6, 'JIMNY', 'S020011', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(831, 'Product', 1, 6, 'CIAZ', 'C0020933', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(832, 'Product', 1, 6, 'SUZUKI', 'S020001', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(833, 'Product', 1, 6, 'SWIFT', 'S0021979', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(834, 'Product', 1, 6, 'SX', 'S0021447', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(835, 'Product', 1, 6, 'VITARA', 'S020005', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(836, 'Product', 1, 6, 'LANDY', 'L0021191', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(837, 'Product', 1, 6, 'MARUTI', 'S020007', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(838, 'Product', 1, 6, 'TR', 'T0020191', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(839, 'Product', 1, 6, 'WAGON', 'W0021983', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(840, 'Product', 1, 6, 'MARUTI OMNI', 'M0021977', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(841, 'Product', 1, 6, 'SPLASH', 'S0020189', 222, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(842, 'Product', 1, 6, 'TANKER', 'T003001', 223, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(843, 'Product', 1, 6, 'LPT 1116', 'L0021694', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(844, 'Product', 1, 6, 'TIPPER', 'M014026', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(845, 'Product', 1, 6, 'LPK 2518', 'L0020461', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(846, 'Product', 1, 6, 'PICKUP', 'T004003', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(847, 'Product', 1, 6, 'LPT 1216', 'L0021984', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(848, 'Product', 1, 6, 'XENON', 'X0021989', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(849, 'Product', 1, 6, 'LPK 2516', 'L0021005', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(850, 'Product', 1, 6, 'TATA', 'T004001', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(851, 'Product', 1, 6, 'TRUCK', 'T004004', 224, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(852, 'Product', 1, 6, 'TG150-8', 'TG1508', 225, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(853, 'Product', 1, 6, 'TIPPER', 'T008001', 226, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(854, 'Product', 1, 6, 'TO BE ADVISED', 'T017001', 227, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(855, 'Product', 1, 6, 'FIELDER', 'T009071', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(856, 'Product', 1, 6, 'RAV4', 'T009032', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(857, 'Product', 1, 6, 'ALPHARD', 'T009079', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(858, 'Product', 1, 6, 'PREMIO', 'T009076', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(859, 'Product', 1, 6, 'COROLLA', 'T009010', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(860, 'Product', 1, 6, 'RUMION', 'R0020211', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(862, 'Product', 1, 6, 'BELTA', 'T009073', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(863, 'Product', 1, 6, 'PLATZ', 'T009051', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(864, 'Product', 1, 6, 'G-TOURING', 'T009040', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(865, 'Product', 1, 6, 'PRIUS', 'P0020208', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(866, 'Product', 1, 6, 'PORTE', 'T009074', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(867, 'Product', 1, 6, 'BB', 'B0020711', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(868, 'Product', 1, 6, 'CARIB', 'T009047', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(869, 'Product', 1, 6, 'LANDCRUISER AMAZON', 'T009049', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(870, 'Product', 1, 6, 'HMV', 'H0020201', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(871, 'Product', 1, 6, 'SIENNA', 'S0020953', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(872, 'Product', 1, 6, 'RUN-X', 'R0020472', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(873, 'Product', 1, 6, 'AVANZA', 'A0020948', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(874, 'Product', 1, 6, 'ES', 'L007002', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(875, 'Product', 1, 6, 'TOYO', 'T009001', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(876, 'Product', 1, 6, 'RACTIS', 'R0021461', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(877, 'Product', 1, 6, 'GT1', 'G0021992', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(878, 'Product', 1, 6, 'VELLFIRE', 'V0020722', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(879, 'Product', 1, 6, 'PASEO', 'P0021698', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(880, 'Product', 1, 6, 'NOAH', 'T009063', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(881, 'Product', 1, 6, 'ALLEX', 'T009048', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(882, 'Product', 1, 6, 'CH-R', 'C0020712', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(883, 'Product', 1, 6, 'HIGHLANDER', 'H0020951', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(884, 'Product', 1, 6, 'LANDCRUISER PRADO', 'T009025', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(885, 'Product', 1, 6, 'ALLION', 'T009067', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(886, 'Product', 1, 6, 'HIACE', 'T009019', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(887, 'Product', 1, 6, 'TOYOACE', 'T0021998', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(888, 'Product', 1, 6, 'SUCCEED', 'T009075', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(889, 'Product', 1, 6, 'STARLET', 'T009033', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(890, 'Product', 1, 6, 'AVENSIS', 'T009041', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(891, 'Product', 1, 6, 'HILUX 4*4', 'T009037', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(892, 'Product', 1, 6, 'PUBLICA', 'P0021700', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(893, 'Product', 1, 6, 'SPADE', 'S0020507', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(894, 'Product', 1, 6, 'CARINA', 'T009007', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(895, 'Product', 1, 6, 'RUNX', 'T009068', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(896, 'Product', 1, 6, 'MARK X', 'T009080', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(897, 'Product', 1, 6, 'AXLE', 'A011001', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(899, 'Product', 1, 6, 'FUN CARGO', 'F0020199', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL),
	(900, 'Product', 1, 6, 'AVALON', 'T009005', 228, '2024-07-25 15:44:54.720919', NULL, NULL, NULL);
/*!40000 ALTER TABLE "stringattribute" ENABLE KEYS */;

-- Dumping structure for table public.user
DROP TABLE IF EXISTS "user";
CREATE TABLE IF NOT EXISTS "user" (
	"id" SERIAL NOT NULL,
	"first_name" VARCHAR(50) NOT NULL,
	"last_name" VARCHAR(50) NULL DEFAULT NULL,
	"name" VARCHAR(128) NOT NULL,
	"username" VARCHAR NULL DEFAULT NULL,
	"password" VARCHAR NULL DEFAULT NULL,
	"email" VARCHAR NOT NULL,
	"phone" VARCHAR NULL DEFAULT NULL,
	"nic" VARCHAR NULL DEFAULT NULL,
	"pin" VARCHAR NULL DEFAULT NULL,
	"lic_no" VARCHAR NULL DEFAULT NULL,
	"gender" VARCHAR NULL DEFAULT NULL,
	"dob" TIMESTAMP NULL DEFAULT NULL,
	"cust_code" VARCHAR(10) NULL DEFAULT NULL,
	"cust_cc_code" VARCHAR NULL DEFAULT NULL,
	"cust_customer_type" VARCHAR NULL DEFAULT NULL,
	"user_flexi" JSONB NULL DEFAULT NULL,
	"premia_cust_payload" JSONB NULL DEFAULT NULL,
	"agency_admin" BOOLEAN NOT NULL DEFAULT false,
	"is_staff" BOOLEAN NOT NULL DEFAULT false,
	"staff_admin" BOOLEAN NOT NULL DEFAULT false,
	"is_active" BOOLEAN NOT NULL DEFAULT false,
	"is_superuser" BOOLEAN NOT NULL DEFAULT false,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "ix_user_email" ("email"),
	INDEX "ix_user_id" ("id")
);

-- Dumping data for table public.user: 2 rows
/*!40000 ALTER TABLE "user" DISABLE KEYS */;
INSERT INTO "user" ("id", "first_name", "last_name", "name", "username", "password", "email", "phone", "nic", "pin", "lic_no", "gender", "dob", "cust_code", "cust_cc_code", "cust_customer_type", "user_flexi", "premia_cust_payload", "agency_admin", "is_staff", "staff_admin", "is_active", "is_superuser", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, 'Dennis', 'Johnson', 'Dennis Johnson', 'dennis.johnson@example.com', '$2b$12$qyDqF.FsPEWmemusCCKDFOPm2aWfDRU.1WdMiTewR9whIY4E5.S/O', 'dennis.johnson@example.com', '747-866-0268', '99150101', 'A2038249208Z', NULL, NULL, NULL, 'K01011738', '01', '02', NULL, '{"cust_dob": null, "cust_name": "DENNIS JOHNSON", "cust_email1": "dennis.johnson@example.com", "cust_gender": null, "cust_ref_no": "99150101", "cust_tax_yn": "1", "cust_vat_yn": "1", "cust_wht_yn": "1", "cust_cc_code": "01", "cust_cc_type": "001", "cust_country": "C01", "cust_flex_03": "126", "cust_flex_04": "126", "cust_mc_code": "01", "cust_civil_id": "A2038249208Z", "cust_cc_prefix": "K01", "cust_last_name": "JOHNSON", "cust_mobile_no": "747-866-0268", "cust_first_name": "DENNIS", "cust_dflt_assr_yn": "1", "cust_customer_type": "02", "cust_mast_def_code": "DIRCL", "cust_all_curr_appl_yn": "1"}', 'false', 'false', 'false', 'false', 'false', '2024-08-02 16:45:19.034077', 1, NULL, NULL),
	(2, 'string', NULL, 'string', NULL, NULL, 'user@example.com', 'string', 'string', 'string', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'false', 'false', 'false', 'false', 'false', '2024-08-02 12:09:03.820599', NULL, NULL, NULL);
/*!40000 ALTER TABLE "user" ENABLE KEYS */;

-- Dumping structure for table public.uwclass
DROP TABLE IF EXISTS "uwclass";
CREATE TABLE IF NOT EXISTS "uwclass" (
	"class_sys_id" SERIAL NOT NULL,
	"class_code" VARCHAR NOT NULL,
	"class_name" VARCHAR NOT NULL,
	"class_frz_flag" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT now(),
	"created_by" INTEGER NULL DEFAULT NULL,
	"updated_at" TIMESTAMP NULL DEFAULT NULL,
	"updated_by" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("class_sys_id"),
	INDEX "ix_uwclass_class_code" ("class_code"),
	INDEX "ix_uwclass_class_name" ("class_name"),
	INDEX "ix_uwclass_class_sys_id" ("class_sys_id")
);

-- Dumping data for table public.uwclass: 10 rows
/*!40000 ALTER TABLE "uwclass" DISABLE KEYS */;
INSERT INTO "uwclass" ("class_sys_id", "class_code", "class_name", "class_frz_flag", "created_at", "created_by", "updated_at", "updated_by") VALUES
	(1, '10', 'Motor Private', 'false', '2024-07-22 16:21:13.031131', NULL, NULL, NULL),
	(2, '11', 'Motor Commercial', 'false', '2024-07-22 16:21:13.044561', NULL, NULL, NULL),
	(3, '20', 'Fire', 'false', '2024-07-22 16:21:13.050312', NULL, NULL, NULL),
	(4, '30', 'Marine', 'false', '2024-07-22 16:21:13.0555', NULL, NULL, NULL),
	(5, '40', 'Engineering', 'false', '2024-07-22 16:21:13.06019', NULL, NULL, NULL),
	(6, '50', 'Accidents & Miscellaneous', 'false', '2024-07-22 16:21:13.065485', NULL, NULL, NULL),
	(7, '60', 'Liability', 'false', '2024-07-22 16:21:13.0714', NULL, NULL, NULL),
	(8, '70', 'Bonds', 'false', '2024-07-22 16:21:13.075927', NULL, NULL, NULL),
	(9, '80', 'Aviation', 'false', '2024-07-22 16:21:13.081081', NULL, NULL, NULL),
	(10, '90', 'Oil and Gas', 'false', '2024-07-22 16:21:13.086367', NULL, NULL, NULL);
/*!40000 ALTER TABLE "uwclass" ENABLE KEYS */;

-- Dumping structure for table public._Audience
DROP TABLE IF EXISTS "_Audience";
CREATE TABLE IF NOT EXISTS "_Audience" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"name" TEXT NULL DEFAULT NULL,
	"query" TEXT NULL DEFAULT NULL,
	"lastUsed" TIMESTAMPTZ NULL DEFAULT NULL,
	"timesUsed" DOUBLE PRECISION NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public._Audience: -1 rows
/*!40000 ALTER TABLE "_Audience" DISABLE KEYS */;
/*!40000 ALTER TABLE "_Audience" ENABLE KEYS */;

-- Dumping structure for table public._GlobalConfig
DROP TABLE IF EXISTS "_GlobalConfig";
CREATE TABLE IF NOT EXISTS "_GlobalConfig" (
	"objectId" TEXT NOT NULL,
	"params" JSONB NULL DEFAULT NULL,
	"masterKeyOnly" JSONB NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public._GlobalConfig: -1 rows
/*!40000 ALTER TABLE "_GlobalConfig" DISABLE KEYS */;
/*!40000 ALTER TABLE "_GlobalConfig" ENABLE KEYS */;

-- Dumping structure for table public._GraphQLConfig
DROP TABLE IF EXISTS "_GraphQLConfig";
CREATE TABLE IF NOT EXISTS "_GraphQLConfig" (
	"objectId" TEXT NOT NULL,
	"config" JSONB NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public._GraphQLConfig: -1 rows
/*!40000 ALTER TABLE "_GraphQLConfig" DISABLE KEYS */;
/*!40000 ALTER TABLE "_GraphQLConfig" ENABLE KEYS */;

-- Dumping structure for table public._Hooks
DROP TABLE IF EXISTS "_Hooks";
CREATE TABLE IF NOT EXISTS "_Hooks" (
	"functionName" TEXT NULL DEFAULT NULL,
	"className" TEXT NULL DEFAULT NULL,
	"triggerName" TEXT NULL DEFAULT NULL,
	"url" TEXT NULL DEFAULT NULL
);

-- Dumping data for table public._Hooks: -1 rows
/*!40000 ALTER TABLE "_Hooks" DISABLE KEYS */;
/*!40000 ALTER TABLE "_Hooks" ENABLE KEYS */;

-- Dumping structure for table public._Idempotency
DROP TABLE IF EXISTS "_Idempotency";
CREATE TABLE IF NOT EXISTS "_Idempotency" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"reqId" TEXT NULL DEFAULT NULL,
	"expire" TIMESTAMPTZ NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId"),
	UNIQUE INDEX "_Idempotency_unique_reqId" ("reqId"),
	INDEX "ttl" ("expire")
);

-- Dumping data for table public._Idempotency: -1 rows
/*!40000 ALTER TABLE "_Idempotency" DISABLE KEYS */;
/*!40000 ALTER TABLE "_Idempotency" ENABLE KEYS */;

-- Dumping structure for table public._JobSchedule
DROP TABLE IF EXISTS "_JobSchedule";
CREATE TABLE IF NOT EXISTS "_JobSchedule" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"jobName" TEXT NULL DEFAULT NULL,
	"description" TEXT NULL DEFAULT NULL,
	"params" TEXT NULL DEFAULT NULL,
	"startAfter" TEXT NULL DEFAULT NULL,
	"daysOfWeek" JSONB NULL DEFAULT NULL,
	"timeOfDay" TEXT NULL DEFAULT NULL,
	"lastRun" DOUBLE PRECISION NULL DEFAULT NULL,
	"repeatMinutes" DOUBLE PRECISION NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public._JobSchedule: -1 rows
/*!40000 ALTER TABLE "_JobSchedule" DISABLE KEYS */;
/*!40000 ALTER TABLE "_JobSchedule" ENABLE KEYS */;

-- Dumping structure for table public._JobStatus
DROP TABLE IF EXISTS "_JobStatus";
CREATE TABLE IF NOT EXISTS "_JobStatus" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"jobName" TEXT NULL DEFAULT NULL,
	"source" TEXT NULL DEFAULT NULL,
	"status" TEXT NULL DEFAULT NULL,
	"message" TEXT NULL DEFAULT NULL,
	"params" JSONB NULL DEFAULT NULL,
	"finishedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public._JobStatus: -1 rows
/*!40000 ALTER TABLE "_JobStatus" DISABLE KEYS */;
/*!40000 ALTER TABLE "_JobStatus" ENABLE KEYS */;

-- Dumping structure for table public._Join:roles:_Role
DROP TABLE IF EXISTS "_Join:roles:_Role";
CREATE TABLE IF NOT EXISTS "_Join:roles:_Role" (
	"relatedId" VARCHAR(120) NOT NULL,
	"owningId" VARCHAR(120) NOT NULL,
	PRIMARY KEY ("relatedId", "owningId")
);

-- Dumping data for table public._Join:roles:_Role: -1 rows
/*!40000 ALTER TABLE "_Join:roles:_Role" DISABLE KEYS */;
/*!40000 ALTER TABLE "_Join:roles:_Role" ENABLE KEYS */;

-- Dumping structure for table public._Join:users:_Role
DROP TABLE IF EXISTS "_Join:users:_Role";
CREATE TABLE IF NOT EXISTS "_Join:users:_Role" (
	"relatedId" VARCHAR(120) NOT NULL,
	"owningId" VARCHAR(120) NOT NULL,
	PRIMARY KEY ("relatedId", "owningId")
);

-- Dumping data for table public._Join:users:_Role: -1 rows
/*!40000 ALTER TABLE "_Join:users:_Role" DISABLE KEYS */;
INSERT INTO "_Join:users:_Role" ("relatedId", "owningId") VALUES
	('jeJFKCADAj', 'dOwjgFQEcW');
/*!40000 ALTER TABLE "_Join:users:_Role" ENABLE KEYS */;

-- Dumping structure for table public._PushStatus
DROP TABLE IF EXISTS "_PushStatus";
CREATE TABLE IF NOT EXISTS "_PushStatus" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"pushTime" TEXT NULL DEFAULT NULL,
	"source" TEXT NULL DEFAULT NULL,
	"query" TEXT NULL DEFAULT NULL,
	"payload" TEXT NULL DEFAULT NULL,
	"title" TEXT NULL DEFAULT NULL,
	"expiry" DOUBLE PRECISION NULL DEFAULT NULL,
	"expiration_interval" DOUBLE PRECISION NULL DEFAULT NULL,
	"status" TEXT NULL DEFAULT NULL,
	"numSent" DOUBLE PRECISION NULL DEFAULT NULL,
	"numFailed" DOUBLE PRECISION NULL DEFAULT NULL,
	"pushHash" TEXT NULL DEFAULT NULL,
	"errorMessage" JSONB NULL DEFAULT NULL,
	"sentPerType" JSONB NULL DEFAULT NULL,
	"failedPerType" JSONB NULL DEFAULT NULL,
	"sentPerUTCOffset" JSONB NULL DEFAULT NULL,
	"failedPerUTCOffset" JSONB NULL DEFAULT NULL,
	"count" DOUBLE PRECISION NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public._PushStatus: -1 rows
/*!40000 ALTER TABLE "_PushStatus" DISABLE KEYS */;
/*!40000 ALTER TABLE "_PushStatus" ENABLE KEYS */;

-- Dumping structure for table public._Role
DROP TABLE IF EXISTS "_Role";
CREATE TABLE IF NOT EXISTS "_Role" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"name" TEXT NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId"),
	UNIQUE INDEX "_Role_unique_name" ("name")
);

-- Dumping data for table public._Role: -1 rows
/*!40000 ALTER TABLE "_Role" DISABLE KEYS */;
INSERT INTO "_Role" ("objectId", "createdAt", "updatedAt", "name", "_rperm", "_wperm") VALUES
	('dOwjgFQEcW', '2024-08-27 09:35:05.231+00', '2024-08-27 09:42:12.068+00', 'Admin', '{*,role:Admin}', '{role:Admin}');
/*!40000 ALTER TABLE "_Role" ENABLE KEYS */;

-- Dumping structure for table public._SCHEMA
DROP TABLE IF EXISTS "_SCHEMA";
CREATE TABLE IF NOT EXISTS "_SCHEMA" (
	"className" VARCHAR(120) NOT NULL,
	"schema" JSONB NULL DEFAULT NULL,
	"isParseClass" BOOLEAN NULL DEFAULT NULL,
	PRIMARY KEY ("className")
);

-- Dumping data for table public._SCHEMA: -1 rows
/*!40000 ALTER TABLE "_SCHEMA" DISABLE KEYS */;
INSERT INTO "_SCHEMA" ("className", "schema", "isParseClass") VALUES
	('_User', '{"fields": {"email": {"type": "String"}, "_rperm": {"type": "Array", "contents": {"type": "String"}}, "_wperm": {"type": "Array", "contents": {"type": "String"}}, "authData": {"type": "Object"}, "objectId": {"type": "String"}, "username": {"type": "String"}, "createdAt": {"type": "Date"}, "updatedAt": {"type": "Date"}, "emailVerified": {"type": "Boolean"}, "_hashed_password": {"type": "String"}}, "className": "_User"}', 'true'),
	('_Role', '{"fields": {"name": {"type": "String"}, "roles": {"type": "Relation", "targetClass": "_Role"}, "users": {"type": "Relation", "targetClass": "_User"}, "_rperm": {"type": "Array", "contents": {"type": "String"}}, "_wperm": {"type": "Array", "contents": {"type": "String"}}, "objectId": {"type": "String"}, "createdAt": {"type": "Date"}, "updatedAt": {"type": "Date"}}, "className": "_Role"}', 'true'),
	('AppSettings', '{"fields": {"_rperm": {"type": "Array", "contents": {"type": "String"}}, "_wperm": {"type": "Array", "contents": {"type": "String"}}, "objectId": {"type": "String"}, "createdAt": {"type": "Date"}, "updatedAt": {"type": "Date"}}, "className": "AppSettings"}', 'true'),
	('_Session', '{"fields": {"user": {"type": "Pointer", "targetClass": "_User"}, "_rperm": {"type": "Array", "contents": {"type": "String"}}, "_wperm": {"type": "Array", "contents": {"type": "String"}}, "objectId": {"type": "String"}, "createdAt": {"type": "Date"}, "expiresAt": {"type": "Date"}, "updatedAt": {"type": "Date"}, "createdWith": {"type": "Object"}, "sessionToken": {"type": "String"}, "installationId": {"type": "String"}}, "className": "_Session"}', 'true'),
	('JazkeSale', '{"fields": {"_rperm": {"type": "Array", "contents": {"type": "String"}}, "_wperm": {"type": "Array", "contents": {"type": "String"}}, "objectId": {"type": "String"}, "createdAt": {"type": "Date"}, "updatedAt": {"type": "Date"}}, "className": "JazkeSale"}', 'true'),
	('JazkeQuotation', '{"fields": {"_rperm": {"type": "Array", "contents": {"type": "String"}}, "_wperm": {"type": "Array", "contents": {"type": "String"}}, "objectId": {"type": "String"}, "createdAt": {"type": "Date"}, "updatedAt": {"type": "Date"}}, "className": "JazkeQuotation"}', 'true');
/*!40000 ALTER TABLE "_SCHEMA" ENABLE KEYS */;

-- Dumping structure for table public._Session
DROP TABLE IF EXISTS "_Session";
CREATE TABLE IF NOT EXISTS "_Session" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"user" TEXT NULL DEFAULT NULL,
	"installationId" TEXT NULL DEFAULT NULL,
	"sessionToken" TEXT NULL DEFAULT NULL,
	"expiresAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"createdWith" JSONB NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	PRIMARY KEY ("objectId")
);

-- Dumping data for table public._Session: -1 rows
/*!40000 ALTER TABLE "_Session" DISABLE KEYS */;
INSERT INTO "_Session" ("objectId", "createdAt", "updatedAt", "user", "installationId", "sessionToken", "expiresAt", "createdWith", "_rperm", "_wperm") VALUES
	('b3w7H8nemo', '2024-08-27 09:31:27.063+00', '2024-08-27 09:31:27.063+00', 'jeJFKCADAj', '5b825d19-9bb1-466e-bd7a-6909b44fcc54', 'r:78c1adffa30e47daae47a5de2dfc21a1', '2025-08-27 09:31:27.062+00', '{"action": "signup", "authProvider": "password"}', NULL, NULL),
	('7Q4elcAVWH', '2024-08-28 07:55:44.93+00', '2024-08-28 07:55:44.93+00', 'jeJFKCADAj', '31d3f01f-11b8-4758-8f1e-132a191a634c', 'r:d59894d341384446d8f98cf183a62c5a', '2025-08-28 07:55:44.93+00', '{"action": "login", "authProvider": "password"}', NULL, NULL),
	('J3xlDkRyLd', '2024-08-28 08:51:04.047+00', '2024-08-28 08:51:04.047+00', 'jeJFKCADAj', '0387a0cb-5e24-40d6-b6dd-545594c56685', 'r:569226c4ad85c1ca637e3a511622b821', '2025-08-28 08:51:04.046+00', '{"action": "login", "authProvider": "password"}', NULL, NULL);
/*!40000 ALTER TABLE "_Session" ENABLE KEYS */;

-- Dumping structure for table public._User
DROP TABLE IF EXISTS "_User";
CREATE TABLE IF NOT EXISTS "_User" (
	"objectId" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"updatedAt" TIMESTAMPTZ NULL DEFAULT NULL,
	"username" TEXT NULL DEFAULT NULL,
	"email" TEXT NULL DEFAULT NULL,
	"emailVerified" BOOLEAN NULL DEFAULT NULL,
	"authData" JSONB NULL DEFAULT NULL,
	"_rperm" UNKNOWN NULL DEFAULT NULL,
	"_wperm" UNKNOWN NULL DEFAULT NULL,
	"_hashed_password" TEXT NULL DEFAULT NULL,
	"_email_verify_token_expires_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"_email_verify_token" TEXT NULL DEFAULT NULL,
	"_account_lockout_expires_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"_failed_login_count" DOUBLE PRECISION NULL DEFAULT NULL,
	"_perishable_token" TEXT NULL DEFAULT NULL,
	"_perishable_token_expires_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"_password_changed_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"_password_history" JSONB NULL DEFAULT NULL,
	PRIMARY KEY ("objectId"),
	UNIQUE INDEX "_User_unique_username" ("username"),
	UNIQUE INDEX "_User_unique_email" ("email")
);

-- Dumping data for table public._User: -1 rows
/*!40000 ALTER TABLE "_User" DISABLE KEYS */;
INSERT INTO "_User" ("objectId", "createdAt", "updatedAt", "username", "email", "emailVerified", "authData", "_rperm", "_wperm", "_hashed_password", "_email_verify_token_expires_at", "_email_verify_token", "_account_lockout_expires_at", "_failed_login_count", "_perishable_token", "_perishable_token_expires_at", "_password_changed_at", "_password_history") VALUES
	('jeJFKCADAj', '2024-08-27 09:31:24.936+00', '2024-08-27 09:31:24.936+00', 'admin', NULL, NULL, NULL, '{jeJFKCADAj}', '{jeJFKCADAj}', '$2y$10$.4XxHz5o8wQjdbQMazeRtuG8FXZGK4OFyXFZfZqe2unt7Wghin2Da', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE "_User" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
