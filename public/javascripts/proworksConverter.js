var proworksConverter = ( function() {
  var convertToValueAttr = function( model, nodeName ) {
    var nodeWrapper = {};
    _.each( model, function( value, key, obj ) {
      obj[key] = { _value: value };
    });
    nodeWrapper[nodeName] = model;
    return nodeWrapper;
  };

  var json2xml_str = function( data, options ) {
    var singular = !_.isArray(data),
        result = singular ? data : { vector: { data: [] } },
        dataList,
        nodeName,
        x2js;

    options = options || {};

    if ( options.defaultXMLConverter ) {
      x2js = options.defaultXMLConverter;
    }

    nodeName = options.nodeName ? options.nodeName : 'element';

    if ( singular ) {
      result = convertToValueAttr( result, nodeName );
    } else {
      dataList = result.vector.data;

      _.reduce( data, function( memo, item ) {
        memo.push( convertToValueAttr( item, nodeName ) );
        return memo;
      }, dataList, this );
    }

    return x2js ? x2js.json2xml_str(result) : '<request/>';
  };

  var convertFromValueAttr = function( model ) {
    _.each( model, function( value, key, obj ) {
      obj[key] = value._value;
    });
    return model;
  };

  var xml2json = function( data, options ) {
    var result,
      singular,
      x2js;

    if ( options.defaultXMLConverter ) {
      x2js = options.defaultXMLConverter;

      result = x2js.xml2json( data );
      singular = !(result.vector && result.vector.data) ? true : _.isArray(result.vector.data) ? false : true;

      if ( singular ) {
        result = result[_.keys(result)[0]];
        convertFromValueAttr(result);
      } else {
        result = result.vector.data;
        result = _.map( result, function( item, idx, list ) {
          list[idx] = item[_.keys(item)[0]];
          convertFromValueAttr(list[idx]);
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