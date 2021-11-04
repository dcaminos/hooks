import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { createAutocomplete } from '@algolia/autocomplete-core';

import { Input } from "antd";
import { RiSearchLine } from "react-icons/ri";

import pagesJson from './search-data/algolia-pages.json'
import { observer } from 'mobx-react-lite';


export type HeaderSearchProps = {
    setSearchHeader: (value:boolean) => void
    inputFocusProp: { ref: React.LegacyRef<Input> | undefined}
}

  
export const HeaderSearch: React.FC<HeaderSearchProps> = observer(props => {

  const [autocompleteState, setAutocompleteState] = useState<any>({});

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state } : {state: any}) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'pages-source',
              getItemInputValue({ item }: {item: any}) {
                return item.query;
              },
              getItems({ query } : {query: string}) {
                if (!query) {
                  return pagesJson;
                }
                return pagesJson.filter((item) => (
                  item.title.toLowerCase().includes(query.toLowerCase())
                ))
              },
              getItemUrl({ item }: {item: any}) {
                return item.url;
              },
              templates: {
                item({ item }: {item: any}) {
                  return (
                    item.title
                  );
                },
              },
            },
          ];
        },
      }),
    []
  );

  function linkHandleClick() {
    autocompleteState.query = ""
    props.setSearchHeader(false)
  }

  return (
    <div {...autocomplete.getRootProps({})}>
      <Input
        {...props.inputFocusProp}
        //{...autocomplete.getInputProps({}) as any}
        placeholder="Search..."
        prefix={
          <RiSearchLine className="site-form-item-icon da-text-color-black-80 da-text-color-dark-20" />
        }
      />

      <div className="da-header-search-result" {...autocomplete.getPanelProps({}) as any}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection:any, index:number) => {
            const { source, items } = collection;

            return (
              items.length > 0 && (
                <ul key={index} {...autocomplete.getListProps()}>
                  {items.map((item:any, index:number) => (
                    index < 4 && (
                      <li
                        key={index}
                        {...autocomplete.getItemProps({
                          item,
                          source,
                        }) as any}
                        className="da-font-weight-500"
                      >
                        <Link
                          to={item.url}
                          onClick={linkHandleClick}
                        >
                          {item.title}
                        </Link>
                      </li>
                    )
                  ))}
                </ul>
              )
            );
          })}
      </div>
    </div>
  );
})