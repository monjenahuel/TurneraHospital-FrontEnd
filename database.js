let especialidades = [
	{
		"idEspecialidad" : 4,
		"nombreEspecialidad" : "Cardiologia"
	},
	{
		"idEspecialidad" : 5,
		"nombreEspecialidad" : "Cirugia"
	},
	{
		"idEspecialidad" : 1,
		"nombreEspecialidad" : "Clinica"
	},
	{
		"idEspecialidad" : 6,
		"nombreEspecialidad" : "Diabetologia"
	},
	{
		"idEspecialidad" : 10,
		"nombreEspecialidad" : "Enfermeria"
	},
	{
		"idEspecialidad" : 3,
		"nombreEspecialidad" : "Kinesiologia"
	},
	{
		"idEspecialidad" : 7,
		"nombreEspecialidad" : "Neurologia"
	},
	{
		"idEspecialidad" : 9,
		"nombreEspecialidad" : "Psicologia"
	},
	{
		"idEspecialidad" : 8,
		"nombreEspecialidad" : "Psiquiatria"
	},
	{
		"idEspecialidad" : 2,
		"nombreEspecialidad" : "Traumatologia"
	}
]

let profesionales = [
	{
		"idProfesional" : 1,
		"nombre" : "Lief",
		"apellido" : "Hartigan",
		"matricula" : "8438762832"
	},
	{
		"idProfesional" : 2,
		"nombre" : "Lucho",
		"apellido" : "Yelyashev",
		"matricula" : "8880059009"
	},
	{
		"idProfesional" : 3,
		"nombre" : "Kort",
		"apellido" : "Smail",
		"matricula" : "0100885861"
	},
	{
		"idProfesional" : 4,
		"nombre" : "Aldrich",
		"apellido" : "Whipple",
		"matricula" : "3605249027"
	},
	{
		"idProfesional" : 5,
		"nombre" : "Ines",
		"apellido" : "Skipper",
		"matricula" : "3643493975"
	},
	{
		"idProfesional" : 6,
		"nombre" : "Mable",
		"apellido" : "Gorham",
		"matricula" : "2612335927"
	},
	{
		"idProfesional" : 7,
		"nombre" : "Lexine",
		"apellido" : "Bottinelli",
		"matricula" : "7642813554"
	},
	{
		"idProfesional" : 8,
		"nombre" : "Patsy",
		"apellido" : "Matley",
		"matricula" : "3669252037"
	},
	{
		"idProfesional" : 9,
		"nombre" : "Vlad",
		"apellido" : "Muscat",
		"matricula" : "4030070884"
	},
	{
		"idProfesional" : 10,
		"nombre" : "Duffy",
		"apellido" : "Greschke",
		"matricula" : "4298894738"
	}
]

let especialidades_profesionales = [
	{
		"idespecialidades_profesional" : 1,
		"idEspecialidad" : 3,
		"idProfesional" : 10
	},
	{
		"idespecialidades_profesional" : 2,
		"idEspecialidad" : 7,
		"idProfesional" : 3
	},
	{
		"idespecialidades_profesional" : 3,
		"idEspecialidad" : 9,
		"idProfesional" : 5
	},
	{
		"idespecialidades_profesional" : 4,
		"idEspecialidad" : 1,
		"idProfesional" : 8
	},
	{
		"idespecialidades_profesional" : 5,
		"idEspecialidad" : 3,
		"idProfesional" : 6
	},
	{
		"idespecialidades_profesional" : 6,
		"idEspecialidad" : 2,
		"idProfesional" : 9
	},
	{
		"idespecialidades_profesional" : 7,
		"idEspecialidad" : 5,
		"idProfesional" : 6
	},
	{
		"idespecialidades_profesional" : 8,
		"idEspecialidad" : 4,
		"idProfesional" : 3
	},
	{
		"idespecialidades_profesional" : 9,
		"idEspecialidad" : 8,
		"idProfesional" : 6
	},
	{
		"idespecialidades_profesional" : 10,
		"idEspecialidad" : 2,
		"idProfesional" : 7
	},
	{
		"idespecialidades_profesional" : 11,
		"idEspecialidad" : 10,
		"idProfesional" : 6
	},
	{
		"idespecialidades_profesional" : 12,
		"idEspecialidad" : 6,
		"idProfesional" : 1
	},
	{
		"idespecialidades_profesional" : 13,
		"idEspecialidad" : 6,
		"idProfesional" : 3
	},
	{
		"idespecialidades_profesional" : 14,
		"idEspecialidad" : 1,
		"idProfesional" : 4
	},
	{
		"idespecialidades_profesional" : 15,
		"idEspecialidad" : 7,
		"idProfesional" : 10
	}
]

export {especialidades as especialidadesDB}
export {profesionales as profesionalesDB}
export {especialidades_profesionales as espProf}