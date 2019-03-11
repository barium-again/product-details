import React from 'react';
import axios from 'axios';

import styles from './style.css';

import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import Main from './Main/Main';
import Header from './Header/Header';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/productDetails/15').then(({ data }) => {
      data.breadcrumbs = data.breadcrumbs.slice(1, -2).split(',');
      data.media = data.media.slice(1, -2).split(',');
      let media = [];
      for (let item of data.media) {
        media.push({ url: item, type: 'image' });
      }
      data.media = media;
      this.setState({
        product: data
      });
    });
  }

  render() {
    if (this.state.product !== undefined) {
      return (
        <div id={styles.app}>
          <Header />
          <div id={styles.contentContainer}>
            <main id={styles.main}>
              <div id={styles.content}>
                <div id={styles.productDetailsContainer1}>
                  <div id={styles.productDetailsContainer2}>
                    <Breadcrumbs breadcrumbs={this.state.product.breadcrumbs} />
                    <Main product={this.state.product} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default ProductDetails;
