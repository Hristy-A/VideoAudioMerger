import { renderPage } from '~/render-page';
import { WorkingList } from '~/widgets/working-list';

const Main = () => {
  return <WorkingList />;
};

renderPage(<Main />);
