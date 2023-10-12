package app.controller;

import app.dto.CarroDTO;
import app.service.CarroService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/carro")
@CrossOrigin(origins = "http://localhost:4200")
public class CarroController {
	
	@Autowired
	private CarroService carroService;
	
	@GetMapping("/listar")
	private ResponseEntity<List<CarroDTO>> listAll(){
		try {		
			List<CarroDTO> lista = carroService.listar();
			return new ResponseEntity<>(lista, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	private ResponseEntity<CarroDTO> save(@RequestBody CarroDTO carroDTO){
		try {
			CarroDTO carroSalva = carroService.save(carroDTO);
			return new ResponseEntity<>(carroSalva, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	private ResponseEntity<CarroDTO> editar(@PathVariable Long id,@RequestBody CarroDTO carroDTO){
		try {
			CarroDTO carroEditada = carroService.editar(id, carroDTO);
			return new ResponseEntity<>(carroEditada, HttpStatus.OK);
		}catch (EntityNotFoundException e) {
			return ResponseEntity.notFound().build();
		} catch(Exception e){
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletar(@PathVariable Long id) {
		carroService.deletar(id);
		return ResponseEntity.ok().build();
	}
}
