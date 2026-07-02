CREATE TABLE roles_sistema (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  nombre      VARCHAR(50) UNIQUE NOT NULL,   -- 'admin', 'usuario', 'reclutador'
  descripcion VARCHAR(255) NOT NULL           -- legible para el panel de administración
);
CREATE TABLE usuarios (
  id                  VARCHAR(36)  PRIMARY KEY DEFAULT (UUID()),
  rol_id              INT          NOT NULL,
  google_id           VARCHAR(255) NULL,
  nombre_completo     VARCHAR(150) NOT NULL,
  correo              VARCHAR(150) NOT NULL UNIQUE,
  password_hash       VARCHAR(255) NULL,
  telefono            VARCHAR(25)  NULL,
  cv_url              VARCHAR(500) NULL,
  texto_presentacion  TEXT         NULL,
  estado              ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
  correo_verificado   BOOLEAN      NOT NULL DEFAULT 0,
  fecha_registro      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES roles_sistema(id)
);

CREATE TABLE empresas_clientes (
  id              INT          PRIMARY KEY AUTO_INCREMENT,
  nombre          VARCHAR(150) NOT NULL,
  ruc             VARCHAR(20)  NOT NULL UNIQUE,
  sector          VARCHAR(100) NOT NULL,
  logo_url        VARCHAR(500) NULL,
  descripcion     TEXT         NULL,
  estado          ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
  fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT uq_empresa_nombre UNIQUE (nombre)
);

CREATE TABLE categorias (
  id     INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  slug   VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE ofertas_trabajo (
  id               INT          PRIMARY KEY AUTO_INCREMENT,
  empresa_id       INT          NOT NULL,
  titulo           VARCHAR(150) NOT NULL,
  slug             VARCHAR(150) NOT NULL UNIQUE,
  descripcion      TEXT         NOT NULL,
  requisitos       TEXT         NULL,
  salario_min      DECIMAL(10,2) NULL,
  salario_max      DECIMAL(10,2) NULL,
  ubicacion        VARCHAR(100) NULL,
  modalidad        ENUM('presencial', 'remoto', 'híbrido') NOT NULL DEFAULT 'presencial',
  tipo_contrato    ENUM('indefinido', 'temporal', 'freelance', 'prácticas', 'por_horas') NOT NULL DEFAULT 'indefinido',
  nivel_experiencia ENUM('junior', 'semisenior', 'senior', 'gerente') NULL,
  categoria_id     INT          NULL,
  estado           ENUM('activa', 'pausada', 'eliminada') NOT NULL DEFAULT 'activa',
  vistas_count     INT          NOT NULL DEFAULT 0,
  fecha_creacion   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- Por defecto expira a los 90 días, toda oferta necesita fecha de expiración
  fecha_expiracion DATETIME     NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 90 DAY),
  -- El salario máximo no puede ser menor al mínimo
  CONSTRAINT ck_oferta_salario CHECK (salario_max IS NULL OR salario_min IS NULL OR salario_max >= salario_min),
  -- La fecha de expiración debe ser posterior a la creación
  CONSTRAINT ck_oferta_expiracion CHECK (fecha_expiracion > fecha_creacion),
  CONSTRAINT fk_oferta_empresa   FOREIGN KEY (empresa_id)    REFERENCES empresas_clientes(id),
  CONSTRAINT fk_oferta_categoria FOREIGN KEY (categoria_id)  REFERENCES categorias(id)
);

CREATE TABLE preguntas_oferta (
  id         INT          PRIMARY KEY AUTO_INCREMENT,
  oferta_id  INT          NOT NULL,
  pregunta   VARCHAR(255) NOT NULL,
  obligatoria BOOLEAN     NOT NULL DEFAULT 0,
  orden      INT          NOT NULL DEFAULT 0,
  -- Evita que dos preguntas tengan el mismo orden dentro de una oferta
  CONSTRAINT uq_pregunta_orden UNIQUE (oferta_id, orden),
  CONSTRAINT fk_pregunta_oferta FOREIGN KEY (oferta_id) REFERENCES ofertas_trabajo(id) ON DELETE CASCADE
);

CREATE TABLE postulaciones_candidatos (
  id               INT          PRIMARY KEY AUTO_INCREMENT,
  usuario_id       VARCHAR(36)  NOT NULL,
  oferta_id        INT          NOT NULL,
  cv_enviado_url   VARCHAR(500) NULL,
  estado           ENUM('recibido', 'revisado', 'rechazado', 'aprobado') NOT NULL DEFAULT 'recibido',
  notas_internas   TEXT         NULL,
  fecha_postulacion DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- Evita postulaciones duplicadas del mismo usuario a la misma oferta
  CONSTRAINT uq_postulacion_usuario_oferta UNIQUE (usuario_id, oferta_id),
  CONSTRAINT fk_postulacion_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_postulacion_oferta  FOREIGN KEY (oferta_id)  REFERENCES ofertas_trabajo(id)
);

CREATE TABLE respuestas_postulacion (
  id             INT  PRIMARY KEY AUTO_INCREMENT,
  postulacion_id INT  NOT NULL,
  pregunta_id    INT  NOT NULL,
  respuesta_texto TEXT NOT NULL,
  CONSTRAINT fk_respuesta_postulacion FOREIGN KEY (postulacion_id) REFERENCES postulaciones_candidatos(id) ON DELETE CASCADE,
  CONSTRAINT fk_respuesta_pregunta    FOREIGN KEY (pregunta_id)    REFERENCES preguntas_oferta(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX idx_ofertas_estado_fecha    ON ofertas_trabajo(estado, fecha_creacion);
CREATE INDEX idx_ofertas_categoria       ON ofertas_trabajo(categoria_id);
CREATE INDEX idx_ofertas_modalidad       ON ofertas_trabajo(modalidad);
CREATE INDEX idx_ofertas_tipo_contrato   ON ofertas_trabajo(tipo_contrato);
CREATE INDEX idx_postulaciones_usuario   ON postulaciones_candidatos(usuario_id);
CREATE INDEX idx_postulaciones_oferta    ON postulaciones_candidatos(oferta_id);



-- Modificaciones para el flujo de postulaci�n (PreguntasFiltro + ConfirmacionCV)
-- Agrega tipo de respuesta y opciones a preguntas_oferta


ALTER TABLE preguntas_oferta
  ADD COLUMN tipo ENUM('si_no','opciones','texto','numero') NOT NULL DEFAULT 'texto'
    COMMENT 'Tipo de respuesta esperada para la pregunta de filtrado'
  AFTER pregunta,
  ADD COLUMN opciones JSON NULL
    COMMENT 'Para tipo opciones: arreglo de strings con las opciones disponibles. Ej: [\"B�sico\",\"Intermedio\",\"Avanzado\"]'
  AFTER tipo;


ALTER TABLE usuarios
ADD COLUMN codigo_recuperacion VARCHAR(6) DEFAULT NULL,
ADD COLUMN expiracion_codigo DATETIME DEFAULT NULL,
ADD COLUMN ultimo_cambio_password DATETIME DEFAULT NULL;