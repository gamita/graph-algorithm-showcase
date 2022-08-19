import './App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ShowcaseItem } from 'ui-components/ShowcaseItem';
import { CategoryContainer } from 'ui-components/CategoryContainer';
import { CategoryTitle, CategorySubTitle } from 'ui-components/CategoryTitle';


function App() {
  return (
    <>
      <Typography variant="h2" align="center">
        Graph Algorithm Showcase
      </Typography>
      <Typography variant="subtitle1" align="center" className="pale-text" sx={{ m: 2 }}>
        - Enjoy graph algo world with visualized process -
      </Typography>
      <hr style={{ width: '80%' }} />
      <CategoryContainer>
        <CategoryTitle title="Path Finding" />
        <CategorySubTitle title="Shortest Path:" />
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ShowcaseItem title="Breadth First Search(BFS) Algorithm" pageUrl="/breadth-first-search-algorithm" imagePath="assets/bfs.gif"></ShowcaseItem>
          </Grid>
          <Grid item xs={4}>
            <ShowcaseItem title="Dijkstra's Algorithm" pageUrl='/dijkstra-algorithm' imagePath="assets/dijkstra.gif"></ShowcaseItem>
          </Grid>
          <Grid item xs={4}>
            <ShowcaseItem title="Bidirectional Dijkstra's Algorithm" pageUrl="/bidirectional-dijkstra-algorithm" imagePath="assets/bidirectional-dijkstra.gif"></ShowcaseItem>
          </Grid>
          <Grid item xs={4}>
            <ShowcaseItem title="A* Algorithm" pageUrl="/astar-algorithm" imagePath="assets/a-star.gif"></ShowcaseItem>
          </Grid>
          <Grid item xs={4}>
            <ShowcaseItem title="Bellman-Ford Algorithm" pageUrl="bellman-ford-algorithm" imagePath="assets/bellman-ford.gif"></ShowcaseItem>
          </Grid>
          <Grid item xs={4}>
            <ShowcaseItem title="Ant Colony Optimization" pageUrl='/ant-colony-optimization-algorithm' imagePath="assets/ant-colony-optimization.gif"></ShowcaseItem>
          </Grid>
        </Grid>
        <CategorySubTitle title="Fattest Path:" />
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ShowcaseItem title="Fattest Path" pageUrl='/fattest-path-algorithm' imagePath="assets/fattest-path.gif"></ShowcaseItem>
          </Grid>
        </Grid>
        <CategorySubTitle title="Minimum Spanning Tree:" />
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ShowcaseItem title="Prim's Algorithm" pageUrl="/prim-algorithm" imagePath="assets/prim.gif"></ShowcaseItem>
          </Grid>
        </Grid>
      </CategoryContainer>
      <CategoryContainer>
        <CategoryTitle title="Community Detection" />
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ShowcaseItem title="Label Propagation Algorithm" pageUrl="/label-propagation-algorithm" imagePath="assets/label-propagation.gif"></ShowcaseItem>
          </Grid>
        </Grid>
      </CategoryContainer>
      <CategoryContainer>
        <CategoryTitle title="Centrality" />
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ShowcaseItem title="Degree Centrality Algorithm" pageUrl='/degree-centrality-algorithm' imagePath="assets/degree-centrality.gif"></ShowcaseItem>
          </Grid>
          <Grid item xs={4}>
            <ShowcaseItem title="Page Rank Algorithm" pageUrl="/pagerank-algorithm" imagePath="assets/pagerank.gif"></ShowcaseItem>
          </Grid>
        </Grid>
      </CategoryContainer>
      <CategoryContainer>
        <CategoryTitle title="Others" />
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ShowcaseItem title="Topological Sort Algorithm" pageUrl="/topological-sort-algorithm" imagePath="assets/topological-sort.gif"></ShowcaseItem>
          </Grid>
        </Grid>
      </CategoryContainer>
    </>);
}

export default App;
