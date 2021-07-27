import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                Object.keys(this.props.emotions).map((key, idx) => <tr>
                    <td>{key}</td>
                    <td>{this.props.emotions[key]}</td>
                </tr>)
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;