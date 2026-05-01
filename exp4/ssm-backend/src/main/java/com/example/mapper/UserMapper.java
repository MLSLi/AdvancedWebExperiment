package com.example.mapper;

import com.example.entity.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    /**
     * 根据用户名查询用户（用于登录验证）
     */
    User selectByUsername(@Param("username") String username);

    /**
     * 插入新用户（用于注册）
     */
    int insert(User user);

    /**
     * 检查用户名是否已存在
     */
    int countByUsername(@Param("username") String username);
}