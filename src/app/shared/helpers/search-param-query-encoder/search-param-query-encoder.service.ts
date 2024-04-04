import { HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forEach, isEmpty, isObject, toString } from 'lodash';

class SearchParamsQueryEncoder extends HttpUrlEncodingCodec {
  encodeKey(k: string): string {
    return k;
    // return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }
}

const handleArraySearchParams = (param: {}, searchParams, parsedKey) => {
  forEach(param, item => {
    searchParams = searchParams.append(`${parsedKey}[]`, toString(item));
  });
  return searchParams;
};

export const jsonToSearchParams = (
  params: {},
  searchParams = new HttpParams({ encoder: new SearchParamsQueryEncoder() }),
  root?: string
) => {
  forEach(params, (param: {}, key: string) => {
    const parsedKey = isEmpty(root) ? key : `${root}[${key}]`;
    param = param || '';

    if (Array.isArray(param)) {
      searchParams = handleArraySearchParams(param, searchParams, parsedKey);
    } else if (isObject(param) && !(param instanceof Date)) {
      searchParams = jsonToSearchParams(param, searchParams, parsedKey);
    } else {
      searchParams = searchParams.set(parsedKey, param.toString());
    }
  });

  return searchParams;
};
