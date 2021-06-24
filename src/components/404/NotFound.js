export default function NotFound( props)  {
  function onClick(){
    props.onNotFound();
  }
  props.setIsMain(false);
  props.setIsMovieOrProfile(false);
  return(
    <div className="notFound">
      <p className="notFound__number">404</p>
      <p className="notFound__caption">Страница не найдена</p>
      <button className="notFound__button" onClick={onClick}>Назад</button>
    </div>
  )
}