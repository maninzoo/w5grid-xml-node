var proworksConverter = ( function() {
  var x2js;

  var convertToValueAttr = function( model, options ) {
    _.each( model, function( value, key, obj ) {
      if ( _.isArray(value) || _.isObject(value) ) {
        options.nodeName = key;
        obj[key] = json2xml_str( value, options, true );
      } else {
        obj[key] = { _value: value };
      }
    });
    return model;
  };

  var setWrapper = function( obj, nodeName, options ) {
    var nodeWrapper = {};
    nodeWrapper[nodeName] = convertToValueAttr( obj, options );
    return nodeWrapper;
  };

  var json2xml_str = function( data, options, isNotRoot ) {
    var singular = !_.isArray(data),
        result = singular ? data : { vector: { data: [] } },
        nodeName,
        dataList;

    if ( !isNotRoot ) {
      options = options || {};

      if ( options.defaultXMLConverter ) {
        x2js = options.defaultXMLConverter;
      }
    }

    nodeName = options.nodeName ? options.nodeName : 'message';

    if ( singular ) {
      if ( isNotRoot ) {
        convertToValueAttr( result, options );
      } else {
        result = setWrapper( result, nodeName, options );
      }
    } else {
      dataList = result.vector.data;

      _.reduce( data, function( memo, item ) {
        memo.push( setWrapper( item, nodeName + '_ele', options ) );
        return memo;
      }, dataList, this );
    }

    if ( !isNotRoot ) {
      _.extend( result[_.keys( result )[0]], options.rootAttrs );
      result = x2js ? x2js.json2xml_str(result) : '<request/>';
    }
    return result;
  };

  var convertFromValueAttr = function( model, options ) {
    var isSkip = false;
    _.each( model, function( value, key, obj ) {
      isSkip = false;
      if ( _.isObject(value) ) {
        _.each( value, function( value2, key2 ) {
          if ( !isSkip ) {
            if ( key2 === '_value' ) {
              obj[key] = value2;
            } else if ( _.isObject(value2) ) {
              isSkip = true;
              obj[key] = xml2json( value, options, true );
            }
          }
        });
      }
    });
    return model;
  };

  var isSingular = function(obj) {
    return !(obj.vector && obj.vector.data) ? true : _.isArray(obj.vector.data) ? false : true;
  };

  var xml2json = function( data, options, isNotRoot ) {
    var result,
        singular,
        value;

    if ( options.defaultXMLConverter ) {
      if ( isNotRoot ) {
        result = data;
      } else {
        x2js = options.defaultXMLConverter;
        result = x2js.xml2json( data );
      }

      singular = isSingular(result);

      if ( singular ) {
        if ( !isNotRoot ) {
          value = result[_.keys(result)[0]];
          if ( _.isObject(value) ) {
            result = value;
          } else {
            return result;
          }
        }
        convertFromValueAttr( result, options );
      } else {
        result = result.vector.data;
        result = _.map( result, function( item, idx, list ) {
          list[idx] = item[_.keys(item)[0]];
          convertFromValueAttr( list[idx], options );
          return list[idx];
        });
      }
    } else {
      result = { response: null };
    }

    return result;
  };

  return {
    json2xml_str: json2xml_str,
    xml2json: xml2json
  }
})();