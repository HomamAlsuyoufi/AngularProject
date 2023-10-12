package app.controller;

import app.dto.LivroDTO;
import app.service.LivroService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/livro")
@CrossOrigin(origins = "http://localhost:4200")
public class LivroController {
	
	@Autowired
	private LivroService livroService;
	
	@GetMapping("/listar")
	private ResponseEntity<List<LivroDTO>> listAll(){
		try {		
			List<LivroDTO> lista = livroService.listar();
			return new ResponseEntity<>(lista, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	private ResponseEntity<LivroDTO> save(@RequestBody LivroDTO livroDTO){
		try {
			LivroDTO livroSalva = livroService.save(livroDTO);
			return new ResponseEntity<>(livroSalva, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{id}")
	private ResponseEntity<LivroDTO> editar(@PathVariable Long id,@RequestBody LivroDTO livroDTO){
		try {
			LivroDTO livroEditada = livroService.editar(id, livroDTO);
			return new ResponseEntity<>(livroEditada, HttpStatus.OK);
		}catch (EntityNotFoundException e) {
			return ResponseEntity.notFound().build();
		} catch(Exception e){
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletar(@PathVariable Long id) {
		livroService.deletar(id);
		return ResponseEntity.ok().build();
	}
}
