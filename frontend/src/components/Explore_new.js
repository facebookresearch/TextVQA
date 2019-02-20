import React, { Component } from 'react';
import { ReactiveBase, CategorySearch, MultiDataList, MultiDropdownList, ResultCard } from '@appbaseio/reactivesearch';

class ExploreNew extends Component {
    seed = Math.round(Math.random() * 10000)

    updateQuery = (query) => {
        let body = query.body;
        body = body.split('\n')
        let queryParams = JSON.parse(body[1]);
        queryParams["query"] = {
            "function_score": {
                "query": queryParams["query"],
                "random_score": {
                    "seed": this.seed
                }
            }
        };

        body[1] = JSON.stringify(queryParams)
        query.body = body.join('\n');
        return query;
    }
    render() {
      return (
          <ReactiveBase
            app="textvqa"
            url="http://localhost:5000"
            transformRequest={this.updateQuery}
          >
            <div style={{ display: "flex", "flexDirection": "row" }}>
              <div style={{ display: "flex", "flexDirection": "column", "width": "40%" }}>
                <CategorySearch
                  componentId="searchbox"
                  dataField="question"
                  categoryField="question"
                  placeholder="Search for questions"
                  style={{
                    padding: "5px",
                    marginTop: "10px"
                  }}
                />
                <MultiDataList
                    componentId="set_name"
                    dataField="set_name"
                    showSearch={false}
                    title="set_name"
                    data={
                        [{
                        label: "train",
                        value: "train"
                        }, {
                        label: "val",
                        value: "val"
                        }, {
                        label: "test",
                        value: "test"
                        }]
                    }
                />
                <MultiDropdownList
                    componentId="image_classes"
                    dataField="image_classes"
                    title="Classes"
                />
              </div>
              <ResultCard
                componentId="result"
                dataField="question"
                title="Results"
                from={0}
                size={6}
                pagination={false}
                react={{
                  and: ["searchbox", "set_name", "image_classes"]
                }}
                renderData={(res) => {
                  return {
                    image: (
                        <div>Hello</div>
                    ),
                    title: res.question,
                    description: res.answers[0]
                  }
                }}
                style={{
                  "width": "60%",
                  "textAlign": "center"
                }}
              />
            </div>
          </ReactiveBase>
      );
    }
}

export default ExploreNew;
