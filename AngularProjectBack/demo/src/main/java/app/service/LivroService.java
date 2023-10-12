package app.service;

import app.dto.LivroDTO;
import app.entity.Livro;
import app.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LivroService {

	@Autowired
	private LivroRepository livroRepository;

	public List<LivroDTO> listar(){
		List<Livro> lista = livroRepository.findAll();
		List<LivroDTO> listaDTO = new ArrayList<>();

		for(int i=0; i<lista.size(); i++) 
			listaDTO.add(this.toLivroDTO(lista.get(i)));

		return listaDTO;
	}

	public LivroDTO save(LivroDTO livroDTO){
		Livro livro = this.toLivro(livroDTO);

		Livro livrosalva = livroRepository.save(livro);

		return this.toLivroDTO(livrosalva);
	}

	public LivroDTO editar(Long id,LivroDTO livroDTO){
		Livro livro = this.toLivro(livroDTO);

		Livro livroAtualizada = livroRepository.save(livro);

		return this.toLivroDTO(livroAtualizada);
	}

	public void deletar(Long id) {
		livroRepository.deleteById(id);
	}

	private LivroDTO toLivroDTO(Livro livro) {
		LivroDTO livroDTO = new LivroDTO();

		livroDTO.setId(livro.getId());
		livroDTO.setAutor(livro.getAutor());
		livroDTO.setTitulo(livro.getTitulo());

		return livroDTO;
	}
	
	private Livro toLivro(LivroDTO livroDTO) {
		Livro livro = new Livro();

		livro.setId(livroDTO.getId());
		livro.setTitulo(livroDTO.getTitulo());
		livro.setAutor(livroDTO.getAutor());

		return livro;
	}

}
