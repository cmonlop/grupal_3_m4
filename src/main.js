import {Empresa} from '/src/clases/Empresa.js';
import {Importacion} from '/src/clases/Importacion.js';


// let empresa = new Empresa(1, "Empresa Prueba", "76.537.946-9");
// let importacion = new Importacion(1, "Producto Prueba", 10, 1000);

// empresa.agregarImportacion(importacion);

// console.log(`Total de importaciones para la empresa ${empresa.nombre}: ${empresa.obtenerTotalImportaciones()}`);

// // console.log(`${empresa.id}, ${empresa.nombre}, ${empresa.rut}, ${importacion}`);

// // console.log(`${importacion.id}, ${importacion.producto}`);

let empresas = {};
let idEmpresa = 0;


document.getElementById('empresa-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let id = document.getElementById('empresa-id').value;
  let nombre = document.getElementById('empresa-nombre').value;
  let rut = document.getElementById('empresa-rut').value;

  let empresa = new Empresa(id, nombre, rut);
  empresas[id] = empresa;
    console.log(empresas[id].id);
    idEmpresa = empresas[id].id;  
  document.getElementById('empresa-form').reset();
});



document.getElementById('importacion-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let id = document.getElementById('importacion-id').value;
    let producto = document.getElementById('importacion-producto').value;
    let numero = document.getElementById('importacion-numero').value;
    let precio = document.getElementById('importacion-precio').value;
    //let idEmpresa = document.getElementById('importacion-empresa-id').value;
    //let idEmpresa = document.getElementById('empresa-id').value;
    console.log(id, producto, numero, precio);
    let importacion = new Importacion(id, producto, numero, precio);
    console.log(importacion)
    if (idEmpresa in empresas) {
      empresas[idEmpresa].agregarImportacion(importacion);
      updateTable(empresas[idEmpresa]);
    } else {
      alert("Empresa no encontrada. Asegúrese de haberla agregado antes de registrar una importación.");
    }
  
    document.getElementById('importacion-form').reset();
  });
  
  function updateTable(empresa) {
    let table = document.getElementById('importaciones-table');
    
    // Primero, borra todas las filas existentes, excepto la fila de encabezado
    while(table.rows.length > 1) {
      table.deleteRow(1);
    }
    
    // Ahora, agrega una nueva fila por cada importación
    for(let importacion of empresa.importaciones) {
      let row = table.insertRow();
      
      let idCell = row.insertCell();
      idCell.textContent = importacion.id;
      
      let productoCell = row.insertCell();
      productoCell.textContent = importacion.producto;
      
      let numeroCell = row.insertCell();
      numeroCell.textContent = importacion.numero;
      
      let precioCell = row.insertCell();
      precioCell.textContent = importacion.precioUnitario;
      
      let totalCell = row.insertCell();
      totalCell.textContent = importacion.obtenerTotal();
    }
  }






