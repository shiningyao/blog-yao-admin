package com.yao.blog.shared.utils;

import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * PageUtils
 */
public class PageUtils {

    public static Pageable parsePageParamMap(Map<String, Object> map, Sort defaultSort) {
        int page = (int) map.getOrDefault("page", 0);
        int size = (int) map.getOrDefault("size", 20);
        Sort sort = defaultSort;
        Pageable pageable = PageRequest.of(page, size, sort);
        return pageable;
    }
}