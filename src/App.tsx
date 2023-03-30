import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { searchType } from './API/api';
import m from './App.module.css'
import Header from './components/Header/Header';
import Movie from './components/Movie/Movie';
import Search from './components/Search/Search';
import { getInitialMoviesThunk, searchMoviesThunk } from './Redux/app-Reducer';
import { appStateType } from './Redux/redux-store';
import { Col, Row, Slider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const App: React.FC = () => {

  const movies = useSelector((state:appStateType) => state.app.movies)
  const errorMessage = useSelector((state:appStateType) => state.app.errorMessage)
  const isLoading = useSelector((state:appStateType) => state.app.isLoading)
  const moviesCount = useSelector((state:appStateType) => state.app.totalMoviesCount)
  const movieTitle = useSelector((state:appStateType) => state.app.movietitle)

  const [currentPage, setCurrentPage] = useState(1)
  
  let moviesPagesCount = 0
  moviesCount == null ? moviesPagesCount = 0 : moviesPagesCount = Math.ceil(moviesCount / 10)

  const pages = []
  for (let index = 0; index <= moviesPagesCount; index++) {
    pages.push(index)
  }

  const [currentPortion, setCurrentPortion] = useState(1)
  const pagesPortion = 5
  const leftBorderPortion = (currentPortion - 1) * pagesPortion + 1
  const rightBorderPortion = currentPortion * pagesPortion
  const forNextButton = Math.ceil(pagesPortion * currentPortion)

  const dispatch = useDispatch()

  const changePage = (page:number) => {
    if(movieTitle) {
      dispatch(searchMoviesThunk(movieTitle, page) as unknown as AnyAction)
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    dispatch(getInitialMoviesThunk() as unknown as AnyAction)
  }, [])

  useEffect(() => {
    setCurrentPortion(1)
    changePage(1)
  }, [movieTitle])


  return (
    <div className={m.wrapper}>
      {isLoading === true
        ? <div>loading...</div>
        : <> <Header title={'Find a movie'} />
          <Search />
          {errorMessage == null
            ? <div className={`${m.paginator} ${!movieTitle && m.none}`}>
              {currentPortion > 1 && <span className={m.paginator__item} onClick={() => { setCurrentPortion(currentPortion - 1) }}><LeftOutlined/></span>}
              {pages.filter((n: number) => n >= leftBorderPortion && n <= rightBorderPortion)
                .map((n: number) => {
                  return <span  className={`${m.paginator__item} ${n === currentPage && m.currentPage}`} onClick={(e) => changePage(n)}>{n}</span>
                })}
              {forNextButton < moviesPagesCount && <span className={m.paginator__item} onClick={() => { setCurrentPortion(currentPortion + 1) }}><RightOutlined /></span>}
            </div>
            : null
          }
          {errorMessage == null
            ? <Row gutter={[25, 15]} className={m.movies__wrapper}> {movies.map((movie: searchType, index: number) => {
              return <Col className={m.movies__item} xs={24} sm={24} md={12} lg={8} xl={6}>
                <Movie key={index} movie={movie}/>
              </Col>
            })}
            </Row>
            : <div>{errorMessage}</div>
          }
        </>
      }
    </div>
  );
}


export default App;

